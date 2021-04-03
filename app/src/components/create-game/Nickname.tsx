import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useFormikContext } from 'formik';

const Nickname = () => {
	const { values, handleChange } = useFormikContext<{ nickname: string }>();

	return (
		<View>
			<TextInput
				style={styles.input}
				value={values.nickname}
				onChangeText={handleChange('nickname')}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	input: {
		paddingLeft: 4,
		borderWidth: 1,
		borderRadius: 4,
		borderColor: '#D3D3D3',
		fontSize: 16
	}
});

export default Nickname;
