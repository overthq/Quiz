import { gql } from 'graphql-request';

const CREATE_GAME = gql`
	mutation CreateGame($creator: String!) {
		insert_games_one(object: { creator: $creator }) {
			id
		}
	}
`;

export default CREATE_GAME;
