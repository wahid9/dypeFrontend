import React from 'react';
import { StyleSheet, View,Image,ScrollView } from 'react-native';
import {Card, Badge, Text,Button} from 'react-native-elements';
 function MesMatchScreens() {
  return (
    
    <ScrollView style={{marginTop: 25}}>
        <View style={styles.container}>
        <Image source={require('../../assets/Dypebleu.png')}  style={{height:116, width:222, marginTop:30,marginBottom:30}}/>
        </View>
        <Text h4 style={{textAlign: 'center'}}>Mes matchs</Text>
        <Card image={require('../../assets/livingRoom.jpg')}>
            <Text>Appartement à louer,Paris 11eme. </Text>
            <Text>2 pièces/30m2. </Text>
            <Text h4>700€/mois </Text>
        </Card>
        <Card image={require('../../assets/livingRoom.jpg')}>
            <Text>Appartement à louer,Paris 11eme. </Text>
            <Text>2 pièces/30m2. </Text>
            <Text h4>700€/mois </Text>
        </Card>
        <Card image={require('../../assets/livingRoom.jpg')}>
            <Text>Appartement à louer,Paris 11eme. </Text>
            <Text>2 pièces/30m2. </Text>
            <Text h4>700€/mois </Text>
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
export default MesMatchScreens();