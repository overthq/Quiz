import { gql } from 'graphql-request';

const UPDATE_SCORE = gql`
	mutation UpdateScore($playerId: uuid!, $score: Int!) {
		update_players_by_pk(
			pk_columns: { id: $playerId }
			_inc: { score: $score }
		) {
			id
			score
		}
	}
`;

export default UPDATE_SCORE;