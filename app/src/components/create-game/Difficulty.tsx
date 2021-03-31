import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useFormikContext } from 'formik';

interface DifficultyOptionProps {
	text: string;
	selected: boolean;
	onSelect(): void;
}

const DifficultyOption: React.FC<DifficultyOptionProps> = ({
	text,
	selected,
	onSelect
}) => (
	<Pressable
		style={[styles.option, selected ? styles.selected : {}]}
		onPress={onSelect}
	>
		<Text>{text}</Text>
	</Pressable>
);

const Difficulty = () => {
	const { values, handleChange } = useFormikContext<{
		difficulty: 'easy' | 'medium' | 'hard';
	}>();

	return (
		<View style={styles.container}>
			{['easy', 'medium', 'hard'].map(value => (
				<DifficultyOption
					text={value[0] + value.substr(1)}
					selected={values.difficulty === value}
					onSelect={() => handleChange(value)}
				/>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16
	},
	option: {
		borderRadius: 4,
		borderWidth: 2,
		height: 40,
		padding: 16,
		borderColor: '#505050',
		backgroundColor: '#FFFFFF'
	},
	selected: {
		borderColor: '#000000',
		backgroundColor: '#F7F7F7'
	}
});

export default Difficulty;
