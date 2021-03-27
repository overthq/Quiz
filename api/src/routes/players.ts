import { Router } from 'express';
import { Player } from '../models';
import { getQuestion } from '../utils/questions';

const router = Router();

// Should the gameId be passed as a param here, or just be fetched from the player's info?
// Performance vs Standard
router.put('/:gameId/:playerId/:round/update-score', async (req, res) => {
	const { gameId, playerId, round } = req.params;
	const { answer, timeLeft } = req.body;

	try {
		const question = await getQuestion({ gameId, round: Number(round) });

		if (answer === question.correct_answer) {
			await Player.findByIdAndUpdate(playerId, {
				$inc: { score: 10 * timeLeft }
			});
		}

		return res.status(200).json({
			success: true,
			message: 'Score successfully updated'
		});
	} catch (error) {
		return res.status(500).json({
			success: true,
			message: error.message
		});
	}
});

export default router;
