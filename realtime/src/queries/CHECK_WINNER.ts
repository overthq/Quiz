import { gql } from 'graphql-request';

const CHECK_WINNER = gql`
	query CheckWinner($gameId: uuid!) {
		players(
			where: { game_id: { _eq: $gameId } }
			distinct_on: [score]
			order_by: [{ score: desc }]
		) {
			id
			address
			score
		}

		games_by_pk(id: $gameId) {
			id
			contract
		}
	}
`;

export default CHECK_WINNER;
