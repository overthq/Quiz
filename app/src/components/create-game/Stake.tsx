import React from 'react';
import { View, TextInput } from 'react-native';
import { useFormikContext } from 'formik';

const Stake = () => {
	const { values, setFieldValue } = useFormikContext();
	return (
		<View>
			<TextInput value={values.stake} onChangeText={setFieldValue('stake')} />
		</View>
	);
};

export default Stake;
