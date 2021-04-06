import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import Button from '../components/Button';

const Connect: React.FC = () => {
	const { connect } = useWalletConnect();

	return (
		<View style={styles.container}>
			<Text style={styles.heading}>Welcome to Quiz!</Text>
			<Button onPress={connect}>Connect your wallet</Button>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16,
		justifyContent: 'center'
	},
	heading: {
		fontSize: 32,
		fontWeight: 'bold',
		marginBottom: 16
	}
});

export default Connect;
