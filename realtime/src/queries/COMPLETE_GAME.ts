import { gql } from 'graphql-request';

const COMPLETE_GAME = gql`
	mutation CompleteGame($playerId: uuid!) {
		update_players_by_pk(
			pk_columns: { id: $playerId }
			_set: { complete: true }
		) {
			id
			score
			complete
		}
	}
`;

export default COMPLETE_GAME;
