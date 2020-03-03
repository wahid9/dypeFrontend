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
      <Drawer.Screen name="Mes favoris" component={FavorisScreen} />
      <Drawer.Screen name="Mes documents" component={Dossier}/>

    </Drawer.Navigator>
    </NavigationContainer>
  );
}


var StackNavigator = createStackNavigator({
  home: HomePage,
  SingUp: Connection,
  SingIn : Inscription ,
  Apercu : ApercuScreen,
  Questionnair : Questionnaire1Screen,
  Match : MyDrawer,
  Favoris : FavorisScreen,
  Camera : CameraScreen,
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
