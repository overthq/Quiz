import React from 'react';
import { View, Text } from 'react-native';
import { usePlayerScoreSubscription } from '../../types/api';

const Score = () => {
	// Use subscription to get the latest score.
	const [data] = usePlayerScoreSubscription();
	// How do we start the subscription?

	return (
		<View>
			<Text>Score:</Text>
			<Text>{data.score}</Text>
		</View>
	);
};

export default Score;

