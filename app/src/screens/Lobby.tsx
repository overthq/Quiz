import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { AppStackParamList } from '../types/navigation';
import Button from '../components/Button';

const Lobby = () => {
	// Use websockets to get a live list of all the participants currently in the game.
	const { accounts } = useWalletConnect(); // How to use this?
	const {
		params: { gameId, role }
	} = useRoute<RouteProp<AppStackParamList, 'Lobby'>>();
	const { navigate } = useNavigation();

	const startGame = () => {
		navigate('Game');
	};

	const joinGame = () => {
		// Do random things
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
