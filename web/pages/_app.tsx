import React from 'react';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import '../styles/globals.css';

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => (
	<Provider store={store}>
		<Component {...pageProps} />
	</Provider>
);

export default App;
