import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MesMatchScreens from "../Annonces/MesMatchsScreen";
import FavorisScreen from '../Mon profil/FavorisScreen';
import Dossier from '../Questionnaire et dossier/DossierScreen';
import RDVScreen from '../Mon profil/RDVScreen';

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
        <Drawer.Screen name="Mes rdv" component={RDVScreen} />
        
  
  </Drawer.Navigator>
    );
  }

  export default MyDrawer;