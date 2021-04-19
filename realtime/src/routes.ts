import { Router } from 'express';
import { Player } from './models';

const router = Router();

router.get('/:gameId/players', async (req, res) => {
	const { gameId } = req.params;

	try {
		const players = await Player.find({ gameId }).sort({ createdAt: 'desc' });
		return res.status(200).json({
			success: true,
			data: { players }
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message
		});
	}
});

export default router;
