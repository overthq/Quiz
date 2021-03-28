import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface LoadingRoundProps {
	round: number;
}

const LoadingRound: React.FC<LoadingRoundProps> = ({ round }) => {
	return (
		<View style={styles.container}>
			<Text>Loading round:</Text>
			<Text>{round}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});

export default LoadingRound;
