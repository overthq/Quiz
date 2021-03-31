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
			<Text>Welcome to Quiz!</Text>
			<Button onPress={connectToWallet}>Connect to wallet</Button>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});

export default Connect;
