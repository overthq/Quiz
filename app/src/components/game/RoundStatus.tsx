import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GameResult } from '../../redux/game/types';

interface RoundStatusProps {
	result: GameResult;
}

const RoundStatus: React.FC<RoundStatusProps> = ({ result }) => {
	const { isCorrect, correctAnswer } = result;
	// Maybe useSubscription to get new score here?

	return (
		<View
			style={[
				styles.container,
				{ backgroundColor: isCorrect ? 'green' : 'red' }
			]}
		>
			<Text>{isCorrect ? 'Correct!' : 'Wrong!'}</Text>
			{!isCorrect && (
				<>
					<Text>The correct answer was:</Text>
					<Text>{correctAnswer}</Text>
				</>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});

export default RoundStatus;
