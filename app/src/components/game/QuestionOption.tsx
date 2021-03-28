import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';

interface QuestionOptionProps {
	text: string;
	onSelect(option: string): void;
}

const QuestionOption: React.FC<QuestionOptionProps> = ({ text, onSelect }) => {
	const handlePress = () => onSelect(text);

	return (
		<Pressable onPress={handlePress} style={styles.container}>
			<Text>{text}</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: 40,
		borderRadius: 20,
		borderWidth: 1,
		borderColor: '#777777'
	}
});

export default QuestionOption;
