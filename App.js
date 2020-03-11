console.disableYellowBox = true;
import React from 'react';

import {createAppContainer,} from 'react-navigation';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Inscription from './screens/Connection/SignUpScreen';
import ForgotPassword from './screens/Connection/ForgotPassword';
import Connection from './screens/Connection/SignInScreen';
import HomePage from './screens/Connection/HomeScreen';
import ApercuScreen from './screens/Annonces/ApercuScreen';
import MesMatchScreens from './screens/Annonces/MesMatchsScreen';
import Questionnaire1Screen from './screens/Questionnaire et dossier/Questionnaire1Screen';
import FavorisScreen from './screens/Mon profil/FavorisScreen';
import CameraScreen from './screens/Questionnaire et dossier/CameraScreen';
import DossierScreen from './screens/Questionnaire et dossier/DossierScreen';
import AnnonceScreen from './screens/Annonces/AnnonceScreen';
import RDVScreen from './screens/Mon profil/RDVScreen';
import Critere from './screens/Annonces/CriteresScreen';
import MyDrawer from './screens/Navigation/DrawerScreen';

import docType from './reducers/docTypeReducer';
import docList from './reducers/docListReducer';
import token from './reducers/userReducer';
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';
import annonce from './reducers/AnnonceReducer';
const store = createStore(combineReducers({docType, docList,token,annonce}));



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
        <Stack.Screen name="MdpOublie" component={ForgotPassword} />
        <Stack.Screen name="Criteres" component={Critere} />
        {/* <Stack.Screen name="Questionnaire" component={Questionnaire1Screen} /> */}
        <Stack.Screen name="Drawer" component={MyDrawer} />
       
      </Stack.Navigator>
  </NavigationContainer>
</Provider>


  );
}



// function MyStack() {
//   return (

// <StackNew.Navigator headerMode= "none">
//   <StackNew.Screen name="MesMatchs" component={MyDrawer} />
//   <StackNew.Screen name="Annonces" component={AnnonceScreen} />
//   <StackNew.Screen name="RendezVous" component={RDVScreen} /> 
// </StackNew.Navigator>
//   );
// }

// const ThirdStack = createStackNavigator();

// function MyStackRdv() {
//   return (

// <ThirdStack.Navigator headerMode= "none">
//   {/* <ThirdStack.Screen name="MesMatchs" component={MesMatchScreens} />
//   <ThirdStack.Screen name="Annonces" component={AnnonceScreen} /> */}
//   <ThirdStack.Screen name="RendezVous" component={RDVScreen} />
// </ThirdStack.Navigator>
//   );
// }
