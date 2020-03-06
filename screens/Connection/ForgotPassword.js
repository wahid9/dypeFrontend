import React, {useState} from 'react';
import { StyleSheet, Text,ImageBackground,Image,KeyboardAvoidingView,Alert} from 'react-native';
import {Button, Input} from 'react-native-elements';

function ForgotPassword({navigation}) {

  const [email,setEmail]= useState("");
  const [mdp,setMdp]= useState("");
  const [mdpConfirm,setMdpConfirm]= useState("");

  var Btn;
  if(email == ''){
    Btn = <Button
    buttonStyle= {{backgroundColor: "#125CE0",borderRadius:5,paddingLeft:65,paddingRight:65}}
    title="Confirmer"
    string = "#79d279" 
    onPress = {()=> Alert.alert("Remplissez vos champs de saisie"," Veuillez remplir tous les champs de saisie")}/>
  }else if(mdp== ''){
    Btn = <Button
    buttonStyle= {{backgroundColor: "#125CE0",borderRadius:5,paddingLeft:65,paddingRight:65}}
    title="Confirmer"
    string = "#79d279" 
    onPress = {()=> Alert.alert("Remplissez vos champs de saisie", "Veuillez remplir tous les champs de saisie")}
/>
  }else if (mdpConfirm == ""){
    Btn = <Button
    buttonStyle= {{backgroundColor: "#125CE0",borderRadius:5,paddingLeft:65,paddingRight:65}}
    title="Confirmer"
    string = "#79d279" 
    onPress = {()=> Alert.alert("Remplissez vos champs de saisie", "Veuillez remplir tous les champs de saisie")}
/>
  }else{
  Btn =  <Button
          buttonStyle= {{backgroundColor: "#125CE0",borderRadius:5,paddingLeft:65,paddingRight:65}}
          title="Confirmer"
          string = "#79d279" 
          onPress={() => navigation.navigate('SignIn') }
      />
  }

  return (
    <ImageBackground source={require('../../assets/picture.jpg')}  style={styles.container}>
     <Image
        source= {require("../../assets/dype.png")}
        style={{height:115, width:222, marginTop:10,marginBottom: 220}}
    />
    <Text style ={{color:"#000",fontSize:30, marginTop:-100, marginBottom:50}}>Réinitialiser votre mot de passe</Text>
    <Input containerStyle = {{marginBottom: 25, width: '70%'}} 
        inputStyle={{ backgroundColor:"white",borderRadius:5,paddingTop:2, opacity:0.7}}
        placeholder='Email'
        onChangeText = {(value)=> setEmail(value)}
        value = {email}
        />
    <Input containerStyle = {{marginBottom: 25, width: '70%'}} 
      inputStyle={{ backgroundColor:"white",borderRadius:5,paddingTop:2, opacity:0.7}}
      placeholder='Nouveau mot de passe'
      onChangeText = {(value)=> setMdp(value)}
      value = {mdp}
    />
    <Input containerStyle = {{marginBottom: 25, width: '70%'}} 
        inputStyle={{ backgroundColor:"white",borderRadius:5,paddingTop:2, opacity:0.7}}
        placeholder='Confirmation mot de passe'
        onChangeText = {(value)=> setMdpConfirm(value)}
        value = {mdpConfirm}
        />
        {Btn}
      <KeyboardAvoidingView behavior = "padding" enabled>
      </KeyboardAvoidingView>
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

export default ForgotPassword;