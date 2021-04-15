import { gql } from 'graphql-request';

const SETUP_GAME = gql`
	mutation SetupGame(
		$gameId: uuid!
		$contract: String!
		$nickname: String!
		$address: String!
	) {
		update_games_by_pk(
			pk_columns: { id: $gameId }
			_set: { contract: $contract }
		) {
			id
			contract
		}

		insert_players_one(
			object: { nickname: $nickname, address: $address, game_id: $gameId }
		) {
			id
			game_id
			nickname
			address
		}
	}
`;

export default SETUP_GAME;
