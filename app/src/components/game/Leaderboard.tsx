import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const Leaderboard = () => {
	// TODO: Create a subscription to be used to load all the users and update when their score changes.

	// Check if everyone has completed, if yes display the winner clearly.
	// If the winner is the viewer, display congratulations message,
	// And let them know that the winnings have been transferred to their crypto wallet.

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Leaderboard</Text>
			<FlatList data={[]} renderItem={() => <View></View>} />
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
		color: '#000000',
		marginVertical: 8
	}
});

export default Leaderboard;
