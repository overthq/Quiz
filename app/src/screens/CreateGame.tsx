import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const CreateGame = () => {
	const handleSubmit = async () => {};

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={handleSubmit}>
				<Text>Create game</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});

export default CreateGame;
