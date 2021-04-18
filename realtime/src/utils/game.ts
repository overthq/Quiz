import { ContractFactory, Contract, getDefaultProvider, Wallet } from 'ethers';
import { cacheQuestions, checkAnswerCorrect } from '../utils/questions';
import { Game, Player } from '../models';
import QuizArtifact from '../abis/Quiz.json';

const provider = getDefaultProvider('http://localhost:7545'); // 'ropsten'
const signer = new Wallet(process.env.PRIVATE_KEY as string, provider);

interface SetupGamePayload {
	nickname: string;
	address: string;
	stake: string;
	category: number;
	difficulty: 'easy' | 'medium' | 'hard';
	rounds: string;
}

export const setupGame = async (payload: SetupGamePayload) => {
	const { nickname, address, stake, category, difficulty, rounds } = payload;

	try {
		const game = new Game({ host: address });

		const Quiz = new ContractFactory(
			QuizArtifact.abi,
			QuizArtifact.bytecode,
			signer
		);

		const [, quiz] = await Promise.all([
			cacheQuestions({
				gameId: game.id,
				category,
				difficulty,
				rounds: Number(rounds)
			}),
			Quiz.deploy(Number(stake))
		]);

		await quiz.deployed();

		game.contract = quiz.address;

		const player = new Player({ nickname, address, gameId: game.id });
		await Promise.all([game.save(), player.save()]);

		return {
			gameId: game.id,
			playerId: player.id,
			contract: quiz.address,
			stake
		};
	} catch (error) {
		console.error(error);
	}
};

interface AnswerQuestionPayload {
	gameId: string;
	round: number;
	playerId: string;
	option: string;
	timeLeft: number;
}

export const answerQuestion = async (payload: AnswerQuestionPayload) => {
	const { gameId, round, playerId, option, timeLeft } = payload;

	const { isCorrect, correctAnswer } = await checkAnswerCorrect({
		gameId,
		round,
		option
	});

	const score = isCorrect ? 10 * timeLeft : 0;

	try {
		const { score: s } = await Player.findByIdAndUpdate(playerId, {
			$inc: { score }
		});
		return {
			score: s,
			isCorrect,
			correctAnswer
		};
	} catch (error) {
		console.error(error.message);
	}
};

interface FinalizeGamePayload {
	gameId: string;
}

export const finalizeGame = async ({ gameId }: FinalizeGamePayload) => {
	const [game, leaderboard] = await Promise.all([
		Game.findById(gameId),
		Player.find({ gameId }).sort({
			score: 'descending'
		})
	]);

	const [winner] = leaderboard;
	const quizContract = new Contract(game.contract, QuizArtifact.abi);

	await quizContract.payout(winner.address);

	return { leaderboard };
};
