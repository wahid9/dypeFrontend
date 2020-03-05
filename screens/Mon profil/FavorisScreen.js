import React,{useState} from 'react';
import { StyleSheet, View,Image,ScrollView, Alert} from 'react-native';
import {Card, Badge, Text,Button} from 'react-native-elements';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { Overlay } from 'react-native-elements';
import IconBurger from '@expo/vector-icons/Feather';

function FavorisScreen({navigation}) {
 
  const [isVisible, setIsVisible] = useState(false);
  return (
    <ScrollView style={{marginTop: 25}}>
       <Overlay
     isVisible={isVisible}
     onBackdropPress={() => {setIsVisible(false)}}
   > 
   </Overlay>
   <IconBurger name= {"menu"} style={{marginLeft: 20, marginTop: 20}} color={'#125ce0'} size={35} onPress={() => navigation.openDrawer()} />
    <View style={{flexDirection:'row',alignItems:'center',alignSelf:'center'}}>
      <Image source={require('../../assets/Dypebleu.png')}  style={{height:66, width:127, marginTop:30,marginBottom:30}}/>
    </View>

    <Text h4 style={{textAlign: 'center'}}>MES FAVORIS</Text>
   
    <Card image={require('../../assets/livingRoom.jpg')} >
        <Text>Appartement à louer,Paris 11eme. </Text>
        <Text>2 pièces/30m2. </Text>
        <Text h4>700€/mois </Text>
        <IconFontAwesome 
         style={{marginLeft:320}}
                name="trash"
                size={25}
                color="black"
                onPress = {()=> {Alert.alert(
                  'Etes-vous sûr(e) de vouloir supprimer cette annonce de vos favoris ? ',
                  '',
                  [
                    
                    {
                      text: 'OUI',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {text: 'NON', onPress: () => console.log('OK Pressed')},
                  ],
                  {cancelable: false},
                  
                );}}
               
            />
    </Card>
    <Card image={require('../../assets/livingRoom.jpg')}>
        <Text>Appartement à louer,Paris 11eme. </Text>
        <Text>2 pièces/30m2. </Text>
        <Text h4>700€/mois </Text>
        <IconFontAwesome style={{marginLeft:320}}
                name="trash"
                size={25}
                color="black"
            />
    </Card>
    <Card image={require('../../assets/livingRoom.jpg')}>
        <Text>Appartement à louer,Paris 11eme. </Text>
        <Text>2 pièces/30m2. </Text>
        <Text h4>700€/mois </Text>
        <IconFontAwesome style={{marginLeft:320}}
                name="trash"
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

export default FavorisScreen;
