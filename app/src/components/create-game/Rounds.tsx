import { useFormikContext } from 'formik';
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

interface RoundOptionProps {
	value: number;
	selected: boolean;
	onSelect(): void;
}

const RoundOption: React.FC<RoundOptionProps> = ({
	value,
	selected,
	onSelect
}) => (
	<Pressable
		key={value.toString()}
		style={[styles.option, selected ? styles.selectedOption : {}]}
		onPress={onSelect}
	>
		<Text style={[styles.text, selected ? styles.selectedText : {}]}>
			{value}
		</Text>
	</Pressable>
);

const Rounds = () => {
	const { values, setFieldValue } = useFormikContext<{ rounds: number }>();

	return (
		<View style={styles.container}>
			{[10, 15, 20].map(value => (
				<RoundOption
					key={value}
					value={value}
					selected={values.rounds === value}
					onSelect={() => setFieldValue('rounds', value)}
				/>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	option: {
		height: 100,
		borderRadius: 4,
		borderWidth: 2,
		borderColor: '#898989',
		justifyContent: 'center',
		alignItems: 'center'
	},
	text: {
		fontSize: 20,
		fontWeight: 'bold'
	},
	selectedOption: {
		borderColor: '#505050',
		backgroundColor: '#898989'
	},
	selectedText: {
		color: '#505050'
	}
});

export default Rounds;
