import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';

interface QuestionOptionProps {
	text: string;
	onSelect(option: string): void;
	disabled: boolean;
}

const QuestionOption: React.FC<QuestionOptionProps> = ({ text, onSelect }) => {
	const [selected, setSelected] = React.useState(false);

	const handlePress = () => {
		onSelect(text);
		setSelected(true);
	};

	return (
		<Pressable
			onPress={handlePress}
			style={[styles.container, selected ? styles.selected : {}]}
		>
			<Text style={[styles.text, selected ? styles.selectedText : {}]}>
				{text}
			</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: 40,
		borderRadius: 20,
		borderWidth: 1,
		borderColor: '#777777',
		justifyContent: 'center',
		alignItems: 'center'
	},
	text: {
		fontSize: 16,
		textAlign: 'center'
	},
	selected: {
		backgroundColor: '#505050'
	},
	selectedText: {
		color: '#D3D3D3'
	}
});

export default QuestionOption;
