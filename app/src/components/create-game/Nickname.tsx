import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { useFormikContext } from 'formik';

const Nickname = () => {
	const { values, handleChange } = useFormikContext<{ nickname: string }>();

	return (
		<View>
			<Text>Set your nickname</Text>
			<Text>This name will be seen by other players. Try to be unique!</Text>
			<TextInput
				value={values.nickname}
				onChangeText={handleChange('nickname')}
			/>
		</View>
	);
};

export default Nickname;
