import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import Button from '../components/Button';

const Connect: React.FC = () => {
	const { createSession } = useWalletConnect();

	const connectToWallet = () => {
		createSession();
	};

	return (
		<View style={styles.container}>
			<Text style={styles.heading}>Welcome to Quiz!</Text>
			<Button onPress={connectToWallet}>Connect your wallet</Button>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	heading: {
		fontSize: 32,
		fontWeight: 'bold'
	}
});

export default Connect;
