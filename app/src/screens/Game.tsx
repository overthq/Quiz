import React from 'react';
import { View, StyleSheet } from 'react-native';
import Progress from '../components/game/Progress';
import CurrentQuestion from '../components/game/CurrentQuestion';
import { useAppSelector } from '../redux/store';
import LoadingRound from '../components/game/LoadingRound';

const Game: React.FC = () => {
	const { loading, currentQuestion, round } = useAppSelector(
		({ game }) => game
	);

	if (loading) return <LoadingRound round={round} />;

	return (
		<View style={styles.container}>
			<Progress />
			<CurrentQuestion question={currentQuestion} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});

export default Game;
