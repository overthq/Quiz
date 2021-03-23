import { Router } from 'express';
import { Score } from '../models';
import client from '../config/redis';
import { promisify } from 'util';

const getAsync = promisify(client.get).bind(client);

const router = Router();

router.post('/:quizId/join', async (req, res) => {
	const { quizId, owner } = req.params;

	try {
		const newScore = new Score({ quizId, owner });
		await newScore.save();
	} catch (error) {}
});

router.put('/:quizId/:scoreId/:round/update', async (req, res) => {
	const { quizId, scoreId, round } = req.params;
	const { answer, duration } = req.body;

	try {
		const question = await getAsync(`${quizId}-${round}`);
		const parsedQuestion = JSON.parse(question);

		if (answer === parsedQuestion.correct_answer) {
			await Score.findByIdAndUpdate(scoreId, {
				$inc: { score: 10 * duration }
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
