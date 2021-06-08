import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Example, { EmptyScreen } from "./screens/Example";
import { StatusBar } from 'react-native';

const SlowStack = createStackNavigator({
  SlowExample: { screen: Example, params: { tabBarVisible: true } },
  Details: {
    screen: EmptyScreen,
    navigationOptions: {
      headerTitle: "Slow on Close"
    },
    params: { tabBarVisible: false }
  }
});

SlowStack.navigationOptions = ({ navigation }: any) => {
  // console.warn('SlowStack')
  const { params = { tabBarVisible: true } } = navigation.state.routes[navigation.state.index];
  return {
    tabBarLabel: 'SlowStack',
    tabBarVisible: params.tabBarVisible // The change on the visibility of tabBar generates the laggy transition
  };
};

const MainTabs = createBottomTabNavigator({
  SlowStack: {
    screen: SlowStack,
    navigationOptions: {
      tabBarLabel: "SlowStack"
    }
  },
});

const AppSwitchNavigator = createSwitchNavigator({
  Auth: {
    screen: MainTabs
  },
});

const AppNavigator = createAppContainer(AppSwitchNavigator);

export const App = () => (
  <SafeAreaProvider>
    <StatusBar barStyle="dark-content" />
    <AppNavigator />
  </SafeAreaProvider>
)

export default App;