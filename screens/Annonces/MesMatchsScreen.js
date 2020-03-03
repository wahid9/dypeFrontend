import React from 'react';
import { StyleSheet, View,Image,ScrollView,TouchableOpacity } from 'react-native';
import {Card, Text,Icon} from 'react-native-elements';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
 function MesMatchScreens({navigation}) {
  return (
    
    <ScrollView style={{marginTop: 25}}>
        <View style={styles.container}>
        <Image source={require('../../assets/Dypebleu.png')}  style={{height:116, width:222, marginTop:30,marginBottom:30}}/>
        </View>
        <Text h4 style={{textAlign: 'center'}}>Mes matchs</Text>
        <TouchableOpacity onPress = {()=> navigation.navigate("Annonce")}>
        <Card image={require('../../assets/livingRoom.jpg')} onPress = {()=> console.log("j'ai toucher")}>
            <Text>Appartement à louer,Paris 11eme. </Text>
            <Text>2 pièces/30m2. </Text>
            <Text h4>700€/mois </Text>
            <IconFontAwesome style={{alignSelf: 'flex-end', marginRight:5}}
                name="heart"
                size={25}
                color="black"
                onPress = {()=> {
                  navigation.navigate('Favoris');
                }}
            />
        </Card>
        </TouchableOpacity>
        <Card image={require('../../assets/livingRoom.jpg')}>
            <Text>Appartement à louer,Paris 11eme. </Text>
            <Text>2 pièces/30m2. </Text>
            <Text h4>700€/mois </Text>
            <IconFontAwesome style={{marginLeft:320}}
                name="heart"
                size={25}
                color="black"
            />
        </Card>
        <Card image={require('../../assets/livingRoom.jpg')}>
            <Text>Appartement à louer,Paris 11eme. </Text>
            <Text>2 pièces/30m2. </Text>
            <Text h4>700€/mois </Text>
            <IconFontAwesome style={{marginLeft:320}}
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