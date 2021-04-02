import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import Button from '../components/Button';

const Home: React.FC = () => {
	const { navigate } = useNavigation();

	const createGame = () => {
		navigate('CreateGame');
	};

	const joinGame = () => {
		navigate('JoinGame');
	};

	return (
		<View style={styles.container}>
			<Button style={{ marginBottom: 8 }} onPress={createGame}>
				Create game
			</Button>
			<Button onPress={joinGame}>Join game</Button>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});

export default Home;
