console.disableYellowBox = true;
import React from 'react';

import {createAppContainer,} from 'react-navigation';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Inscription from './screens/Connection/SignUpScreen';
import Connection from './screens/Connection/SignInScreen';
import HomePage from './screens/Connection/HomeScreen';
import ApercuScreen from './screens/Annonces/ApercuScreen';
import MesMatchScreens from './screens/Annonces/MesMatchsScreen';
import Questionnaire1Screen from './screens/Questionnaire et dossier/Questionnaire1Screen';
import FavorisScreen from './screens/Mon profil/FavorisScreen'
import CameraScreen from './screens/Questionnaire et dossier/CameraScreen'
import Dossier from './screens/Questionnaire et dossier/DossierScreen'
import AnnonceScreen from './screens/Annonces/AnnonceScreen';

import documentReducer from './reducers/documentReducer';
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';
const store = createStore(combineReducers({documentReducer}));


const Stack = createStackNavigator();

export default function App() {
  return (

<Provider store={store}>
  <NavigationContainer>

    <Stack.Navigator
        headerMode= "none">
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="SignIn" component={Connection} />
        <Stack.Screen name="SignUp" component={Inscription} />
        <Stack.Screen name="Questionnaire" component={Questionnaire1Screen} />
        <Stack.Screen name="Favoris" component={FavorisScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Apercu" component={ApercuScreen} />
        <Stack.Screen name="Match" component={MyDrawer} />
        <Stack.Screen name="Annonces" component={AnnonceScreen} />
      </Stack.Navigator>
  </NavigationContainer>
</Provider>


  );
}


const Drawer = createDrawerNavigator();
function MyDrawer() {
  return (
    
    <Drawer.Navigator
    drawerContentOptions={{
      activeTintColor: '#FCE229',
      inactiveTintColor: '#FFFFFF'
      
    }}
    drawerStyle={{
      backgroundColor :'#125CE0',
      width: 200,
      
    }}>
      <Drawer.Screen name="Mes matchs" component={MesMatchScreens} />
      <Drawer.Screen name="Mes Favoris" component={FavorisScreen} />
      <Drawer.Screen name="Mes documents" component={Dossier}/>

    </Drawer.Navigator>

  );
}
