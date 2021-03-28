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
		width: '100%'
	}
});

export default QuestionOption;
