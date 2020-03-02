import React from 'react';
import {createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Inscription from './screens/Connection/SignUpScreen';
import Connection from './screens/Connection/SignInScreen';
import HomePage from './screens/Connection/HomeScreen'
import ApercuScreen from './screens/Annonces/ApercuScreen'

var StackNavigator = createStackNavigator({
  home: HomePage,
  SingUp: Connection,
  SingIn : Inscription ,
  Apercu : ApercuScreen,
  },
  {
    headerMode: "none",
  },
);

const Navigation = createAppContainer(StackNavigator);
export default function App() {
  return (
    <Navigation/>
  );
}
