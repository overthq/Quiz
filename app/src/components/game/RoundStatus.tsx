import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RoundStatus = () => {
	const isCorrect = true;
	const correctAnswer = 'thing';

	// Have some kind of mount animation.
	// Also, in the future, allow all animations to be turned off in settings.

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
