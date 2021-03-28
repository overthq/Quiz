import { Router } from 'express';
import { gql, GraphQLClient } from 'graphql-request';

const router = Router();

const client = new GraphQLClient(process.env.HASURA_URL, {
	headers: {
		'X-Hasura-Admin-Secret': process.env.HASURA_ADMIN_SECRET
	}
});

router.post('/answer/:gameId/:round', async (req, res) => {
	const { gameId, round } = req.params;
	const { playerId, option, timeLeft } = req.body;

	const correct = true;
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
