import 'react-native-gesture-handler';
import React from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WalletConnectProvider from '@walletconnect/react-native-dapp';
import Routes from './src/navigation/Routes';

const App = () => {
	return (
		<WalletConnectProvider
			bridge='https://bridge.walletconnect.org'
			clientMeta={{
				description: 'Connect with WalletConnect',
				url: 'https://walletconnect.org',
				icons: ['https://walletconnect.org/walletconnect-logo.png'],
				name: 'WalletConnect'
			}}
			redirectUrl={Platform.OS === 'web' ? window.location.origin : 'quiz://'}
			storageOptions={{ asyncStorage: AsyncStorage as any }}
		>
			<Routes />
		</WalletConnectProvider>
	);
};

export default App;
