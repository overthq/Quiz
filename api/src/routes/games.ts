import { Router } from 'express';
import { Game, Player } from '../models';
import { cacheQuestions, getQuestion } from '../utils/questions';

const router = Router();

router.post('/new', async (req, res) => {
	const { creator, difficulty, category } = req.body;

	const game = new Game({ creator });

	// Deploy a new game contract with the ABI, and store the contract address.
	// (Also allow users to increase contract deployment speed for a fee)
	// We are deploying the contract from the server, to make sure that:
	// the deployer address is ours, which enables us (and only us) to trigger the payout function

	game.contract = '';

	await cacheQuestions({ gameId: game.id, category, difficulty });
	await game.save();

	return res.status(201).json({
		success: true,
		data: { game }
	});
});

// On the frontend, call the pay function on the contract, and on success, call this endpoint
router.put('/:gameId/start', async (req, res) => {
	try {
		// Update game status to 'started'
	} catch (error) {}
});

router.post('/:gameId/join', async (req, res) => {
	const { gameId } = req.params;
	const { address } = req.body;

	// Run validations

	const player = new Player({ address, gameId });

	await player.save();

	return res.status(201).json({
		success: true,
		data: { player }
	});
});

router.get('/:gameId/question/:round', async (req, res) => {
	const { gameId, round } = req.params;

	try {
		const question = await getQuestion({ gameId, round: Number(round) });

		return res.status(200).json({
			success: true,
			data: {
				question: {
					title: question.question,
					options: [question.correct_answer, ...question.incorrect_answers]
				}
			}
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message
		});
	}
});

router.get('/:gameId/final-scores', async (req, res) => {
	const { gameId } = req.params;

	try {
		const game = await Game.findById(gameId);

		if (!game) {
			return res.status(404).json({
				success: false,
				data: { message: 'Specified game does not exist' }
			});
		}

		const players = await Player.find({ gameId });

		return res.status(200).json({
			success: true,
			data: { players }
		});
	} catch (error) {
		return res.status(500).json({
			success: true,
			data: { message: 'An error has occured' }
		});
	}
});

export default router;
