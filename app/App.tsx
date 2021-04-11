import 'react-native-gesture-handler';
import React from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from 'react-redux';
import WalletConnectProvider from '@walletconnect/react-native-dapp';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider as UrqlProvider } from 'urql';
import Routes from './src/navigation/Routes';
import { store, persistor } from './src/redux/store';
import { client } from './src/utils/graphql';

const App = () => (
	<Provider store={store}>
		<PersistGate persistor={persistor}>
			<UrqlProvider value={client}>
				<WalletConnectProvider
					bridge='https://bridge.walletconnect.org'
					clientMeta={{
						description: 'Connect with Quiz',
						url: 'https://quiz.app',
						icons: ['https://walletconnect.org/walletconnect-logo.png'],
						name: 'Quiz'
					}}
					redirectUrl={
						Platform.OS === 'web' ? window.location.origin : 'quiz://'
					}
					storageOptions={{ asyncStorage: AsyncStorage as any }}
				>
					<Routes />
				</WalletConnectProvider>
			</UrqlProvider>
		</PersistGate>
	</Provider>
);

export default App;
