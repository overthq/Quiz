import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useWalletConnect } from '@walletconnect/react-native-dapp';

import Connect from '../screens/Connect';
import Home from '../screens/Home';
import Game from '../screens/Game';
import CreateGame from '../screens/CreateGame';

const AppStack = createStackNavigator();

const Routes = () => {
	const connector = useWalletConnect();

	return (
		<NavigationContainer>
			<AppStack.Navigator headerMode='none'>
				{!connector._connected && (
					<AppStack.Screen name='Connect' component={Connect} />
				)}
				<AppStack.Screen name='Home' component={Home} />
				<AppStack.Screen name='CreateGame' component={CreateGame} />
				<AppStack.Screen name='Game' component={Game} />
			</AppStack.Navigator>
		</NavigationContainer>
	);
};

export default Routes;
