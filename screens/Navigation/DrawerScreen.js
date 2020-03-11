import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import MesMatchScreens from "../Annonces/MesMatchsScreen";
import FavorisScreen from '../Mon profil/FavorisScreen';
import Dossier from '../Questionnaire et dossier/DossierScreen';
import RDVScreen from '../Mon profil/RDVScreen';
import AnnonceScreen from '../Annonces/AnnonceScreen';
import IconHouse from '@expo/vector-icons/AntDesign';
import IconHeart from '@expo/vector-icons/FontAwesome';
import IconDoc from '@expo/vector-icons/MaterialCommunityIcons';
import IconRdv from '@expo/vector-icons/AntDesign'
import { Image, View, ImageBackground } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

function MyDrawer() {
    return (
  

      <Drawer.Navigator    
        drawerContentOptions={{
          activeTintColor: '#FCE229',
          inactiveTintColor: '#FFFFFF',
          style: <Image source={require('../../assets/Mascotte.png')} />
        }}
        drawerStyle={{
          backgroundColor :'#125CE0',
          width: 200,
          
        }}
        
          // drawerContent={props => <ImageBackground source={require('../../assets/Mascotte.png')}/>}
        
      >
        <Drawer.Screen options={{
                         drawerIcon: ({color: tintColor}) => <IconHouse
                            name='home' 
                            size={18}
                            color={tintColor}
                            />
                       }}
                       name="Mes matchs" component={MyStack} />
        <Drawer.Screen options={{
                         drawerIcon: ({color: tintColor}) => <IconHeart
                            name='heart-o' 
                            size={18}
                            color={tintColor}
                            />
                       }}
                       name="Mes Favoris" component={FavorisScreen} />
        <Drawer.Screen options={{
                         drawerIcon: ({color: tintColor}) => <IconDoc
                            name='file-document-outline' 
                            size={18}
                            color={tintColor}
                            />
                       }}
                       name="Mes documents" component={Dossier}/>
        <Drawer.Screen options={{
                         drawerIcon: ({color: tintColor}) => <IconRdv
                            name='calendar' 
                            size={18}
                            color={tintColor}
                            />
                       }}
                       name="Mes rdv" component={RDVScreen} />
        
  
  </Drawer.Navigator>

  
    );
  }

  // <Stack.Screen name="Favoris" component={FavorisScreen} />
  // <Stack.Screen name="Camera" component={CameraScreen} />
  // <Stack.Screen name="Apercu" component={ApercuScreen} />
  // <Stack.Screen name="Match" component={MyStack} />
  // {/* <Stack.Screen name="Annonces" component={AnnonceScreen} /> */}
  // <Stack.Screen name="RendezVous" component={RDVScreen} />
  // <Stack.Screen name="Dossier" component={DossierScreen} />

  const StackNew = createStackNavigator();

function MyStack() {
  return (

<StackNew.Navigator headerMode= "none">
  <StackNew.Screen name="MesMatchs" component={MesMatchScreens} />
  <StackNew.Screen name="Annonces" component={AnnonceScreen} />
  
</StackNew.Navigator>
  );
}

  export default MyDrawer;