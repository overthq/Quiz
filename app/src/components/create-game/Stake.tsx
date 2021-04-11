import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useFormikContext } from 'formik';

// In the near future, we need to add a toggle between ETH and BNB
// It would be nice to do this based on the connected wallet.
// Rainbow/Metamask -> ETH, TrustWallet -> ETH/BNB
// Basically, display the toggle based on the kind of wallet connected.

const Stake = () => {
	const { values, handleChange } = useFormikContext<{ stake: string }>();

	return (
		<View style={styles.container}>
			<TextInput
				placeholder='0.00'
				style={styles.input}
				value={values.stake}
				onChangeText={handleChange('stake')}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
		alignItems: 'center'
	},
	input: {
		borderColor: '#505050',
		borderWidth: 2,
		height: 45,
		paddingLeft: 8,
		fontSize: 20
	}
});

export default Stake;
