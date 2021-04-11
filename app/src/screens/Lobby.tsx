import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
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

	const { accounts } = useWalletConnect();
	const [{ data }] = useGamePlayersSubscription({ variables: { gameId } });
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

	const isInGame = React.useMemo(
		() => data.players.map(p => p.address).includes(accounts[0]),
		[data.players]
	);

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Lobby</Text>
			<FlatList
				keyExtractor={p => p.id}
				data={data.players}
				renderItem={({ item }) => (
					<View style={{ width: '100%', height: 40, padding: 8 }}>
						<Text style={{ fontSize: 16 }}>{item.nickname}</Text>
					</View>
				)}
			/>
			<View style={styles.buttonContainer}>
				{role === 'creator' ? (
					<Button onPress={startGame}>Start game</Button>
				) : (
					<Button onPress={joinGame} loading={isInGame}>
						{isInGame ? 'Waiting' : 'Join game'}
					</Button>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16
	},
	header: {
		fontSize: 32,
		fontWeight: 'bold'
	},
	buttonContainer: {
		paddingBottom: 16
	}
});

export default Lobby;
