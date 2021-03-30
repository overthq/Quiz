import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { AppStackParamList } from '../types/navigation';
import Button from '../components/Button';
import {
	useCreatePlayerMutation,
	useGamePlayersSubscription
} from '../types/api';

const Lobby = () => {
	const {
		params: { gameId, role }
	} = useRoute<RouteProp<AppStackParamList, 'Lobby'>>();

	const [,] = useGamePlayersSubscription({ variables: { gameId } });
	const [, createPlayer] = useCreatePlayerMutation();

	const { navigate } = useNavigation();

	const startGame = () => {
		navigate('Game');
	};

	const joinGame = async () => {
		// Opens a modal with a form.
		await createPlayer({
			playerObject: {
				game_id: gameId,
				address: '',
				nickname: ''
			}
		});
	};

	return (
		<View style={styles.container}>
			<Text>Game starting</Text>
			<Text>Waiting for more players to join...</Text>
			{role === 'creator' ? (
				<Button onPress={startGame}>Start game</Button>
			) : (
				<Button onPress={joinGame}>Join game</Button>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});

export default Lobby;
