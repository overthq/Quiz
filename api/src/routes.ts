import { Router } from 'express';
import { GraphQLClient } from 'graphql-request';
import 'cross-fetch/polyfill';
import { ContractFactory, Contract, Wallet, getDefaultProvider } from 'ethers';
import {
	cacheQuestions,
	checkAnswerCorrect,
	getQuestion
} from './utils/questions';
import SETUP_GAME from './queries/SETUP_GAME';
import CREATE_GAME from './queries/CREATE_GAME';
import UPDATE_SCORE from './queries/UPDATE_SCORE';
import COMPLETE_GAME from './queries/COMPLETE_GAME';
import CHECK_WINNER from './queries/CHECK_WINNER';
import CHECK_PLAYERS from './queries/CHECK_PLAYERS';

import QuizArtifact from './abis/Quiz.json';

const router = Router();
const provider = getDefaultProvider('http://localhost:7545'); // 'ropsten'
const signer = new Wallet(process.env.PRIVATE_KEY as string, provider);
const client = new GraphQLClient(process.env.HASURA_URL as string);

router.post('/setup', async (req, res) => {
	const { nickname, address, stake, category, difficulty, rounds } = req.body;

	try {
		const { insert_games_one } = await client.request(CREATE_GAME, {
			creator: address
		});
		const gameId = insert_games_one.id;

		const Quiz = new ContractFactory(
			QuizArtifact.abi,
			QuizArtifact.bytecode,
			signer
		);

		const [, quiz] = await Promise.all([
			cacheQuestions({
				gameId,
				category,
				difficulty,
				rounds: Number(rounds)
			}),
			Quiz.deploy(stake)
		]);

		await quiz.deployed();
		const data = await client.request(SETUP_GAME, {
			gameId,
			contract: quiz.address,
			nickname,
			address
		});

		res.status(201).json({
			success: true,
			data: {
				gameId: data.update_games_by_pk.id,
				contract: data.update_games_by_pk.contract
			}
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			data: { message: error.message }
		});
	}
});

router.get('/question/:gameId/:round', async (req, res) => {
	const { gameId, round } = req.params;
	try {
		const question = await getQuestion({ gameId, round: Number(round) });
		res.status(200).json({
			success: true,
			data: { question }
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			data: { message: error.message }
		});
	}
});

router.post('/answer/:gameId/:round', async (req, res) => {
	const { gameId, round } = req.params;
	const { playerId, option, timeLeft } = req.body;

	const { isCorrect, correctAnswer } = await checkAnswerCorrect({
		gameId,
		round,
		option
	});

	const score = isCorrect ? 10 * timeLeft : 0;

	try {
		const data = await client.request(UPDATE_SCORE, { playerId, score });
		return res.status(200).json({
			success: true,
			data: {
				score: data.score,
				isCorrect,
				correctAnswer
			}
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			data: { message: error.message }
		});
	}
});

// Note: This is very bad code to resolve the winner of a game.
// It seems very prone to race conditions, and is too much computation to run for every user.
// Really does not scale, but is only used to test that the game workflow works.

router.post('/complete', async (req, res) => {
	const { playerId } = req.body;

	try {
		const { update_players_by_pk } = await client.request(COMPLETE_GAME, {
			playerId
		});

		const gameId = update_players_by_pk.game_id;

		// TODO: What do we do if a user gets disconnected during the game?
		// The following logic does not hold in that case.

		const { players: stillPlaying } = await client.request(CHECK_PLAYERS, {
			gameId
		});

		if (stillPlaying.length === 0) {
			const { players, games_by_pk } = await client.request(CHECK_WINNER, {
				gameId
			});
			const { contract } = games_by_pk;

			const quizContract = new Contract(contract, QuizArtifact.abi);

			quizContract.payout(players[0].address);
		}
	} catch (error) {
		return res.status(500).json({
			success: false,
			data: { message: error.message }
		});
	}
});

export default router;
