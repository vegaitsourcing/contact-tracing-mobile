import React from 'react';
import { Text } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import Home from './components/Home';
import CheckContacts from './components/CheckContacts';

export default function App() {
  return (
    <AppContainer />
  );
}
const AppStackNavigator = createSwitchNavigator({
  Home:Home,
  Check:CheckContacts
},
{
  initialRouteName: 'Home',
})

const AppContainer = createAppContainer(AppStackNavigator);  