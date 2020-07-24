import React from 'react';
import {AsyncStorage} from "react-native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import MesMatchScreens from "../Annonces/MesMatchsScreen";
import FavorisScreen from '../Mon profil/FavorisScreen';
import Dossier from '../Questionnaire et dossier/DossierScreen';
import RDVScreen from '../Mon profil/RDVScreen';
import AnnonceScreen from '../Annonces/AnnonceScreen';
import Critere from '../Annonces/CriteresScreen';
import IconHouse from '@expo/vector-icons/AntDesign';
import IconHeart from '@expo/vector-icons/FontAwesome';
import IconDoc from '@expo/vector-icons/MaterialCommunityIcons';
import IconRdv from '@expo/vector-icons/AntDesign';
import IconLogout from '@expo/vector-icons/Feather';
import { Image, View, ImageBackground, Text } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import IconGlass from '@expo/vector-icons/Entypo'
import { SafeAreaView } from 'react-native';


const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <SafeAreaView style= {{flex: 1, backgroundColor: '#125CE0'}}>
      <View style={{alignItems: "center", justifyContent: 'center'}}>
        <Image source={require('../../assets/Mascotte.png')}
               style={{height: 84, width: 45, marginTop: 20}} />
      </View>
      <ScrollView>
        <TouchableOpacity style= {{marginTop: 30}}
                          onPress={() => props.navigation.navigate('Mes matchs', {screen: 'MesMatchs'})}>
          <View style={{flexDirection: 'row'}}>
            <IconHouse name='home' 
                      size={18}
                      style={{marginLeft:10}}
                      color={'#FCE229'}/>
            <Text style={{color: '#FCE229', marginLeft: 25}}>Mes matchs</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style= {{marginTop: 25}}
                          onPress={() => props.navigation.navigate('Mes favoris', {screen: 'MesFavoris'})}>
          <View style={{flexDirection: 'row'}}>
            <IconHeart name='heart-o' 
                      size={18}
                      style={{marginLeft:10}}
                      color={'#FCE229'}/>
            <Text style={{color: '#FCE229', marginLeft: 25}}>Mes favoris</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style= {{marginTop: 25}}
                          onPress={() => props.navigation.navigate('Mes documents')}>
          <View style={{flexDirection: 'row'}}>
            <IconDoc name='file-document-outline' 
                      size={18}
                      style={{marginLeft:10}}
                      color={'#FCE229'}/>
            <Text style={{color: '#FCE229', marginLeft: 25}}>Mes documents</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style= {{marginTop: 25}}
                          onPress={() => props.navigation.navigate('Mes rdv')}>
          <View style={{flexDirection: 'row'}}>
            <IconRdv name='calendar' 
                      size={18}
                      style={{marginLeft:10}}
                      color={'#FCE229'}/>
            <Text style={{color: '#FCE229', marginLeft: 25}}>Mes rdv</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style= {{marginTop: 25}}
                          onPress={() => props.navigation.navigate('Criteres')}>
          <View style={{flexDirection: 'row'}}>
            <IconGlass name='magnifying-glass' 
                      size={18}
                      style={{marginLeft:10}}
                      color={'#FCE229'}/>
            <Text style={{color: '#FCE229', marginLeft: 25}}>Mes recherches</Text>
          </View>
        </TouchableOpacity>

      </ScrollView>
      <TouchableOpacity style= {{marginBottom: 15}}
                        onPress={() =>{ 
                        // PERMET DE SUPP LE STORAGE ET DE NAVIGUER VERS LA HOME
                        props.navigation.navigate('Home');
                        // AsyncStorage.clear()
                        }}>
        <View style={{flexDirection: 'row'}}>
          <IconLogout name='log-out' 
                    size={18}
                    style={{marginLeft:10}}
                    color={'#FCE229'}/>
          <Text style={{color: '#FCE229', marginLeft: 25}}>Deconnexion</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

function MyDrawer() {
    return (
  
      <Drawer.Navigator    
        drawerStyle={{
          backgroundColor :'#125CE0',
          width: 240,
        }}
        drawerContent= {props => CustomDrawerContent(props)} >
        <Drawer.Screen name="Mes matchs" component={MyStack} />
        <Drawer.Screen name="Mes favoris" component={FavStack} />
        <Drawer.Screen name="Mes documents" component={Dossier}/>
        <Drawer.Screen name="Mes rdv" component={RDVScreen} />
        <Drawer.Screen name="Mes recherches" component={Critere} />
      </Drawer.Navigator>

    );
  }

const StackNew = createStackNavigator();

function MyStack() {
  return (

<StackNew.Navigator initialRouteName= "MesMatchs"
                    headerMode= "none">
  <StackNew.Screen name="MesMatchs" component={MesMatchScreens} />
  <StackNew.Screen name="Annonces" component={AnnonceScreen} />
  
</StackNew.Navigator>
  );
}

const StackFav = createStackNavigator();

function FavStack() {
  return (

<StackFav.Navigator initialRouteName= "MesFavoris"
                    headerMode= "none">
  <StackFav.Screen name="MesFavoris" component={FavorisScreen} />
  <StackFav.Screen name="Annonces" component={AnnonceScreen} />
  
</StackFav.Navigator>
  );
}

  export default MyDrawer;