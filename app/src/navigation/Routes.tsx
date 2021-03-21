import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useWalletConnect } from "@walletconnect/react-native-dapp";

import Connect from "../screens/Connect";
import Home from "../screens/Home";
import Game from "../screens/Game";

const AppStack = createStackNavigator();

const Routes = () => {
  const { connected } = useWalletConnect();

  return (
    <NavigationContainer>
      <AppStack.Navigator headerMode="none">
        {connected && <AppStack.Screen name="Connect" component={Connect} />}
        <AppStack.Screen name="Home" component={Home} />
        <AppStack.Screen name="Game" component={Game} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
