import React from 'react';
import { View, TextInput } from 'react-native';
import { useFormikContext } from 'formik';

const Stake = () => {
	const { values, handleChange } = useFormikContext<{ stake: string }>();

	return (
		<View>
			<TextInput value={values.stake} onChangeText={handleChange('stake')} />
		</View>
	);
};

export default Stake;
