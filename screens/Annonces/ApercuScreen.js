import React from 'react';
import { StyleSheet, View,Image } from 'react-native';
import {Card, Badge, Text,Button} from 'react-native-elements';

 function ApercuScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/Dypebleu.png')}  style={{height:116, width:222,marginTop:-150, marginBottom:50}}/>
      <Text h4 style={{textAlign: 'center'}}>Aperçu des biens disponible</Text>
      <Card image={require('../../assets/Dypebleu.png')}>
            <Badge status="success" value="homme"/>
            <Badge status="success" value="70 ans"/>
            <Badge status="success" value="barbe"/>
            <Badge status="success" value="joyeux !"/>
            <Badge status="success" value="cheveux gris"/>
        </Card>
      <Button
           title="Créer mon dossier"
           type="solid"
           buttonStyle={{backgroundColor: "#125CE0",paddingLeft:50,paddingRight:50, marginTop:50}}
           onPress={() => { navigation.navigate('Questionnair')}}
          
       />

    </View>
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

export default ApercuScreen;