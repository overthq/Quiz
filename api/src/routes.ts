import { Router } from 'express';
import { GraphQLClient } from 'graphql-request';
import { ContractFactory } from 'ethers';
import {
	cacheQuestions,
	checkAnswerCorrect,
	getQuestion
} from './utils/questions';
import SETUP_GAME from './queries/SETUP_GAME';
import CREATE_GAME from './queries/CREATE_GAME';
import UPDATE_SCORE from './queries/UPDATE_SCORE';

import QuizArtifact from './abis/Quiz.json';

const router = Router();

const client = new GraphQLClient(process.env.HASURA_URL as string);

router.post('/setup', async (req, res) => {
	const { nickname, address, stake, category, difficulty, rounds } = req.body;

	try {
		const { insert_games_one } = await client.request(CREATE_GAME, {
			creator: address
		});
		const gameId = insert_games_one.id;

		const Quiz = new ContractFactory(QuizArtifact.abi, QuizArtifact.bytecode);

		const [, quiz] = await Promise.all([
			cacheQuestions({
				gameId,
				category,
				difficulty,
				rounds: Number(rounds)
			}),
			Quiz.deploy(Number(stake))
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

// How do we finalize that the game has ended?
// We can call a function on app close, that ends the game for the given player, and resets the game state.

export default router;
