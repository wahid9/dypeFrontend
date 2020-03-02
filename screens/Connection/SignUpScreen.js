import React from 'react';
import { StyleSheet,ImageBackground,Image,Text} from 'react-native';
import {Button, Input} from 'react-native-elements';

function Inscription(navigation) {
  return (
    <ImageBackground source={require('../../assets/picture.jpg')}  style={styles.container}>
    <Image
        source= {require("../../assets/dype.png")}
        style={{height:115, width:222, marginTop:70}}
    />    
    <Input containerStyle = {{marginBottom: 25, width: '70%'}} 
            inputStyle={{marginTop:80 ,backgroundColor:"white",borderRadius:5,paddingTop:2, opacity:0.7}}
            placeholder='Nom'/>
    <Input containerStyle = {{marginBottom: 25, width: '70%'}} 
            inputStyle={{ backgroundColor:"white",borderRadius:5,paddingTop:2, opacity:0.7}}
            placeholder='Prénom'/>
    <Input containerStyle = {{marginBottom: 25, width: '70%'}} 
            inputStyle={{ backgroundColor:"white",borderRadius:5,paddingTop:2, opacity:0.7}}
            placeholder='Email'/>
    <Input containerStyle = {{marginBottom: 25, width: '70%'}} 
            inputStyle={{ backgroundColor:"white",borderRadius:5,paddingTop:2, opacity:0.7}}
            placeholder='Mot de passe'/>
    <Input containerStyle = {{marginBottom: 25, width: '70%'}} 
            inputStyle={{ backgroundColor:"white",borderRadius:5,paddingTop:2, opacity:0.7}}
            placeholder='Confirmation mot de passe'/>
     <Button
          buttonStyle= {{backgroundColor: "#125CE0",borderRadius:5,paddingLeft:65,paddingRight:65}}
          title="S'inscrire"
          string = "#79d279" 
        />
    <Text style={{color:"white",marginTop:50}}>Déja membre? Se connecter</Text>
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

export default Inscription;