console.disableYellowBox = true;
import React from 'react';

import {createAppContainer,} from 'react-navigation';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from 'react-navigation-stack';

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

const Drawer = createDrawerNavigator();

// const Stack = createStackNavigator()

// function MyStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Annonce" component={AnnonceScreen} />
//       <Stack.Screen name="Mes Matchs" component={MesMatchScreens} />
//     </Stack.Navigator>
//   );
// }




var StackNavigator = createStackNavigator({
  home: HomePage,
  SingUp: Connection,
  SingIn : Inscription ,
  Apercu : ApercuScreen,
  Questionnair : Questionnaire1Screen,
  Match : MyDrawer, params: MesMatchScreens,
  Annonce: AnnonceScreen
  // Camera : CameraScreen,
  

  },
  {
    headerMode: "none",
  },
);

const Drawer = createDrawerNavigator();
function MyDrawer() {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
}


// var StackNavigator = createStackNavigator({
//   home: HomePage,
//   SingUp: Connection,
//   SingIn : Inscription ,
//   Apercu : ApercuScreen,
//   Questionnair : Questionnaire1Screen,
//   Favoris : FavorisScreen,
//   Camera : CameraScreen,
//   Annonce : AnnonceScreen,
//   Match : MyDrawer

//   },
//   {
//     headerMode: "none",
//   },
// );



const Navigation = createAppContainer(StackNavigator);
export default function App() {
  return (

    <Provider store={store}>
      <Navigation/>
    </Provider>
    
  );
}
