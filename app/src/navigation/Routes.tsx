import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Connect from '../screens/Connect';
import Home from '../screens/Home';
import Game from '../screens/Game';
import CreateGame from '../screens/CreateGame';
import { session } from '../utils/client';

const AppStack = createStackNavigator();

const Routes = () => (
	<NavigationContainer>
		<AppStack.Navigator headerMode='none'>
			{!session && <AppStack.Screen name='Connect' component={Connect} />}
			<AppStack.Screen name='Home' component={Home} />
			<AppStack.Screen name='CreateGame' component={CreateGame} />
			<AppStack.Screen name='Game' component={Game} />
		</AppStack.Navigator>
	</NavigationContainer>
);

export default Routes;
