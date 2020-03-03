import React from 'react';
import { StyleSheet, Text,ImageBackground,Image} from 'react-native';
import {Button, Input} from 'react-native-elements';

function Connection({navigation}) {
  return (
    <ImageBackground source={require('../../assets/picture.jpg')}  style={styles.container}>
     <Image
        source= {require("../../assets/dype.png")}
        style={{height:115, width:222, marginTop:60,marginBottom: 210}}
    />
    <Input containerStyle = {{marginBottom: 25, width: '70%'}} 
        inputStyle={{ backgroundColor:"white",borderRadius:5,paddingTop:2, opacity:0.7}}
        placeholder='Mot de passe'/>
    <Input containerStyle = {{marginBottom: 25, width: '70%'}} 
        inputStyle={{ backgroundColor:"white",borderRadius:5,paddingTop:2, opacity:0.7}}
        placeholder='Confirmation mot de passe'/>
     <Button
          buttonStyle= {{backgroundColor: "#125CE0",borderRadius:5,paddingLeft:65,paddingRight:65}}
          title="Se Connecter"
          string = "#79d279" 
          onPress={() => { navigation.navigate('Apercu')}}
      />
      <Text style={{color:"white",marginTop:50}}>Mot de passe oublié?</Text>
      <Text style={{color:"white",marginTop:50}}>Pas de compte? S'inscrire</Text>
    </ImageBackground>
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

export default Connection;