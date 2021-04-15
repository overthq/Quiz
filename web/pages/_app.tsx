import React from 'react';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider as UrqlProvider } from 'urql';
import { persistor, store } from '../redux/store';
import { client } from '../utils/graphql';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<UrqlProvider value={client}>
					<Component {...pageProps} />
				</UrqlProvider>
			</PersistGate>
		</Provider>
	);
}

export default MyApp;
