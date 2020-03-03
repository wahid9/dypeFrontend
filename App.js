console.disableYellowBox = true;
import React from 'react';
import {createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Inscription from './screens/Connection/SignUpScreen';
import Connection from './screens/Connection/SignInScreen';
import HomePage from './screens/Connection/HomeScreen';
import ApercuScreen from './screens/Annonces/ApercuScreen';
import MesMatchScreens from './screens/Annonces/MesMatchsScreen';
import Questionnaire1Screen from './screens/Questionnaire et dossier/Questionnaire1Screen';
import FavorisScreen from './screens/Mon profil/FavorisScreen';
import AnnonceScreen from './screens/Annonces/AnnonceScreen';

var StackNavigator = createStackNavigator({
  home: HomePage,
  SingUp: Connection,
  SingIn : Inscription ,
  Apercu : ApercuScreen,
  Questionnair : Questionnaire1Screen,
  Match : MesMatchScreens,
  Favoris : FavorisScreen,
  Annonce : AnnonceScreen,

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
