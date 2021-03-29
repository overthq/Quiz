import { Router } from 'express';
import { gql, GraphQLClient } from 'graphql-request';
import {
	cacheQuestions,
	checkAnswerCorrect,
	getQuestion
} from '../utils/questions';

const router = Router();

const client = new GraphQLClient(process.env.HASURA_URL, {
	headers: {
		'X-Hasura-Admin-Secret': process.env.HASURA_ADMIN_SECRET
	}
});

router.post('/cache/:gameId', async (req, res) => {
	const { gameId } = req.params;
	const { category, difficulty, rounds } = req.body;

	try {
		await cacheQuestions({
			gameId,
			category,
			difficulty,
			rounds: Number(rounds)
		});
		res.status(201).json({
			success: true,
			data: { message: 'Questions successfully cached' }
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

	const correct = await checkAnswerCorrect({ gameId, round, option });
	const score = correct ? 10 * timeLeft : 0;

	try {
		await client.request(
			gql`
				mutation UpdateScore($playerId: uuid!, $score: Int!) {
					update_players_by_pk(
						pk_columns: { id: $playerId }
						_inc: { score: $score }
					) {
						id
						score
					}
				}
			`,
			{ playerId, score }
		);
	} catch (error) {
		return res.status(500).json({
			success: false,
			data: {
				message: error.message
			}
		});
	}
});

export default router;
