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
		<Text style={styles.optionText}>{text}</Text>
	</Pressable>
);

const Difficulty = () => {
	const { values, setFieldValue } = useFormikContext<{
		difficulty: 'easy' | 'medium' | 'hard';
	}>();

	return (
		<View style={styles.container}>
			{['easy', 'medium', 'hard'].map(value => (
				<DifficultyOption
					key={value}
					text={value[0].toUpperCase() + value.substr(1)}
					selected={values.difficulty === value}
					onSelect={() => setFieldValue('difficulty', value)}
				/>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	option: {
		borderRadius: 4,
		borderWidth: 2,
		height: 40,
		borderColor: '#505050',
		backgroundColor: '#FFFFFF',
		marginTop: 8,
		paddingLeft: 8,
		justifyContent: 'center'
	},
	selected: {
		borderColor: '#000000',
		backgroundColor: '#F7F7F7'
	},
	optionText: {
		fontWeight: '500',
		fontSize: 18
	}
});

export default Difficulty;
