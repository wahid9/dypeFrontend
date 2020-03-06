import React from 'react';
import {Card, Text,Icon,Button} from 'react-native-elements';
import { StyleSheet, View,Image,ScrollView,TouchableOpacity } from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconBurger from '@expo/vector-icons/Feather';
 
function MesMatchScreens({navigation}) {
  return (
    <ScrollView style={{marginTop: 25}}>
      
      <IconBurger name= {"menu"} style={{marginLeft: 20, marginTop: 20}} color={'#125ce0'} size={35} onPress={() => navigation.openDrawer()} />
      <View style={{flexDirection:'row',alignItems:'center',alignSelf:'center'}}>
      <Image source={require('../../assets/Dypebleu.png')}  style={{height:66, width:127, marginBottom:30,}}/>
      </View>
      
       
        <Text h4 style={{textAlign: 'center'}}>Mes matchs</Text>
        <TouchableOpacity onPress = {()=> navigation.navigate('Annonces')}>
        <Card image={require('../../assets/livingRoom.jpg')} onPress = {()=> console.log("j'ai toucher")}>
            <Text>Appartement à louer,Paris 11eme. </Text>
            <Text>2 pièces/30m2. </Text>
            <Text h4>700€/mois </Text>
            <IconFontAwesome style={{alignSelf: 'flex-end', marginRight:5}}
                name="heart"
                size={25}
                color="black"
            />
        </Card>
        </TouchableOpacity>
        <Card image={require('../../assets/livingRoom.jpg')}>
            <Text>Appartement à louer,Paris 11eme. </Text>
            <Text>2 pièces/30m2. </Text>
            <Text h4>700€/mois </Text>
            <IconFontAwesome style={{alignSelf: 'flex-end', marginRight:5}}
                name="heart"
                size={25}
                color="black"
            />
        </Card>
        <Card image={require('../../assets/livingRoom.jpg')}>
            <Text>Appartement à louer,Paris 11eme. </Text>
            <Text>2 pièces/30m2. </Text>
            <Text h4>700€/mois </Text>
            <IconFontAwesome style={{alignSelf: 'flex-end', marginRight:5}}
                name="heart"
                size={25}
                color="black"
            />
        </Card>
    </ScrollView>
   
    

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default MesMatchScreens;