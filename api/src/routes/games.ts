import { Router } from 'express';
import fetch from 'node-fetch';
import { Game, Score } from '../models';
import client from '../config/redis';
import { promisify } from 'util';

const getAsync = promisify(client.get).bind(client);

const router = Router();

const cacheQuestions = async (quizId: string, categoryId: number) => {
	const response = await fetch(
		`https://opentdb.com/api.php?amount=10&category=${categoryId}&type=multiple`,
		{
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		}
	);
	const data = await response.json();

	const questionsCachedForm = data.results.map(
		(question: any, index: number) => [
			`${quizId}-${index}`,
			JSON.stringify({
				question: question.question,
				correct: question.correct_answer,
				incorrect: question.incorrect_answers
			})
		]
	);

	client.mset(...questionsCachedForm, error => {
		if (error) {
			console.log('Error when caching questions for quiz: ', quizId);
		}
	});
};

router.post('/new', async (req, res) => {
	const { creator, categoryId } = req.body;

	const newGame = new Game({ creator });

	// Deploy a new game contract with the ABI, and store the contract address.
	// Also allow users to increase contract deployment speed (for a fee).

	await cacheQuestions(newGame.id, categoryId);

	newGame.contract = '';

	await newGame.save();

	return res.status(201).json({
		success: true,
		message: 'Game created'
	});
});

router.get('/:id/winner', async (req, res) => {
	const { id } = req.params;

	try {
		const game = await Game.findById(id);

		if (!game) {
			return res.status(404).json({
				success: false,
				data: {
					message: 'Specified game does not exist'
				}
			});
		}

		return res.status(200).json({
			success: true,
			data: { winner: game.winner }
		});
	} catch (error) {
		return res.status(500).json({
			success: true,
			data: { message: error.message }
		});
	}
});

router.get('/:gameId/question/:round', async (req, res) => {
	const { gameId, round } = req.params;

	try {
		const question = await getAsync(`${gameId}-${round}`);
		const parsedQuestion = JSON.parse(question);
		return res.status(200).json({
			success: true,
			data: {
				question: {
					title: parsedQuestion.question,
					options: [
						parsedQuestion.correct_answer,
						...parsedQuestion.incorrect_answers
					]
					// Randomize the order of this array to make sure that the first answer isn't always the correct one.
				}
			}
		});
	} catch (error) {
		console.log(error);
	}
});

router.get('/:gameId/final-scores', async (req, res) => {
	const { gameId } = req.params;

	try {
		const game = await Game.findById(gameId);

		if (!game) {
			return res.status(404).json({
				success: false,
				data: {
					message: 'Specified game does not exist'
				}
			});
		}

		const scores = await Score.find({ gameId });

		return res.status(200).json({
			success: true,
			data: { scores }
		});
	} catch (error) {
		return res.status(500).json({
			success: true,
			data: { message: 'An error has occured' }
		});
	}
});

export default router;
