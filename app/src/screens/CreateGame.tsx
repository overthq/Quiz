import React from 'react';
import {
	View,
	TextInput,
	TouchableOpacity,
	Text,
	StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCreateGameMutation, useCreatePlayerMutation } from '../types/api';
import { useWalletConnect } from '@walletconnect/react-native-dapp';

const CreateGame = () => {
	const [nickname, setNickname] = React.useState('');
	const [, createGame] = useCreateGameMutation();
	const [, createPlayer] = useCreatePlayerMutation();
	const { navigate } = useNavigation();
	const { accounts } = useWalletConnect();

	const handleSubmit = async () => {
		const { data } = await createGame({
			gameObject: {
				creator: accounts[0] // Is this the connected address?
			}
		});

		// - Deploy contract and set address on game entity
		// - Pay split to contract using WalletConnect
		// - Cache questions
		// - Create player
		// * Promise.all will come in handy here

		await createPlayer({
			playerObject: {
				address: accounts[0],
				nickname
			}
		});

		navigate('Lobby', {
			gameId: data?.insert_games_one?.id,
			role: 'creator'
		});
	};

	return (
		<View style={styles.container}>
			<Text>Create game</Text>
			<Text></Text>
			<TextInput onChangeText={setNickname} />
			<TouchableOpacity onPress={handleSubmit}>
				<Text>Create game</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});

export default CreateGame;
