import { gql } from 'graphql-request';

const CHECK_PLAYERS = gql`
	query CheckPlayers($gameId: uuid!) {
		players(
			where: {
				_and: [{ game_id: { _eq: $gameId } }, { complete: { _eq: false } }]
			}
		) {
			id
		}
	}
`;

export default CHECK_PLAYERS;
