import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { useFormikContext } from 'formik';

const Nickname = () => {
	const { values, handleChange } = useFormikContext<{ nickname: string }>();

	return (
		<View>
			<TextInput
				value={values.nickname}
				onChangeText={handleChange('nickname')}
			/>
		</View>
	);
};

export default Nickname;
