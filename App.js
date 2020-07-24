console.disableYellowBox = true;
import React,{useState} from 'react';
import {AsyncStorage} from 'react-native';

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
import HomePage2 from './screens/Connection/HomeScreen 2';

import docType from './reducers/docTypeReducer';
import docList from './reducers/docListReducer';
import token from './reducers/userReducer';
import favlist from './reducers/favorisListReducer'
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';
import annonce from './reducers/AnnonceReducer';
import RDV from './reducers/RDVReducer';
import validDossier from './reducers/validDossierReducer';
const store = createStore(combineReducers({docType, docList,token,annonce,favlist,RDV, validDossier}));

// const Stack = createStackNavigator();








export default function App() {
  //  PERMET DE SWITCH ENTRE LES SCREEN 
  // const [userToken, setUserToken]= useState("");
  // AsyncStorage.getItem('token',(err,value)=>{
  //   setUserToken(value);
  // })
  
  // var nom;
  // var composant;
  // if(userToken){
  // nom = 'MyDrawer'
  // composant = MyDrawer
  // }else{
  //   nom = 'Home'
  //   composant = HomePage
  // }

  return (

<Provider store={store}>
  <NavigationContainer>

    <Stack.Navigator
        headerMode= "none">
        <Stack.Screen name= 'Home' component={HomePage} />
        {/* <Stack.Screen name={nom} component={composant} /> */}
        <Stack.Screen name="SignIn" component={Connection} />
        <Stack.Screen name="SignUp" component={Inscription} />
        <Stack.Screen name="MdpOublie" component={ForgotPassword} />
        <Stack.Screen name="Criteres" component={Critere} />
        <Stack.Screen name="Drawer" component={MyDrawer} />
        <Stack.Screen name="Annonces" component={AnnonceScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Dossier" component={DossierScreen} />
        <Stack.Screen name="Mes rdv" component={RDVScreen} />
        {/* <Stack.Screen name="Home2" component={HomePage2} /> */}

      </Stack.Navigator>
  </NavigationContainer>
</Provider>


  );
}