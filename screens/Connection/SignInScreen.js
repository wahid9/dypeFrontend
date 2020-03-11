import React, {useState} from 'react';
import { StyleSheet, Text,ImageBackground,Image,KeyboardAvoidingView,Alert} from 'react-native';
import {Button, Input} from 'react-native-elements';
import { set } from 'react-native-reanimated';
import { connect } from 'react-redux';
import { requestPermissionsAsync } from 'expo-camera';

function Connection({navigation,onSubmitToken}) {
  const [email, setEmail]= useState("");
  const [mdp, setMdp]= useState("");
  

var signIn = async ()=> {
  var data = await fetch('http://10.2.5.209:3000/signIn', {
    method: 'POST',
    headers: {'Content-Type':'application/x-www-form-urlencoded'},
    body: `email=${email}&mdp=${mdp}`
  });

  var response = await data.json();
  console.log("RES", response)
  
  onSubmitToken(response.monToken)
  
  if(response.success == false){
    Alert.alert("Email ou mot de passe incorrects", "Veuillez saisir le bon email et mot de passe")
  }else{
    navigation.navigate('Criteres');
  }
}
  var Btn;
  if(email == ''){
    Btn = <Button
    buttonStyle= {{backgroundColor: "#125CE0",borderRadius:5,paddingLeft:65,paddingRight:65}}
    title="Se Connecter"
    string = "#79d279" 
    onPress = {()=> Alert.alert("Remplissez vos champs de saisie","Veuillez saisir votre email et mot de passe")}/>
  }else if(mdp== ''){
    Btn = <Button
    buttonStyle= {{backgroundColor: "#125CE0",borderRadius:5,paddingLeft:65,paddingRight:65}}
    title="Se Connecter"
    string = "#79d279" 
    onPress = {()=> Alert.alert("Remplissez vos champs de saisie", "Veuillez saisir votre email et mot de passe")}
/>
  }else{
  Btn =  <Button
          buttonStyle= {{backgroundColor: "#125CE0",borderRadius:5,paddingLeft:65,paddingRight:65}}
          title="Se Connecter"
          string = "#79d279" 
          onPress={() => { signIn() }}
      />
  }
  return (
    <ImageBackground source={require('../../assets/picture.jpg')}  style={styles.container}>
     <Image
        source= {require("../../assets/dype.png")}
        style={{height:115, width:222, marginTop:60,marginBottom: 210}}
    />
    <Input containerStyle = {{marginBottom: 25, width: '70%'}} 
        inputStyle={{ backgroundColor:"white",borderRadius:5,paddingTop:2, opacity:0.7}}
        placeholder='Email'
        onChangeText = {(value)=> setEmail(value)}
        value = {email}
        />
    <Input containerStyle = {{marginBottom: 25, width: '70%'}} 
        inputStyle={{ backgroundColor:"white",borderRadius:5,paddingTop:2, opacity:0.7}}
        placeholder='Mot de passe'
        onChangeText = {(value)=> setMdp(value)}
        value = {mdp}
        />
        {Btn}
      <Text style={{color:"white",marginTop:50}}
      onPress = {()=> navigation.navigate("MdpOublie") }
      >Mot de passe oublié?</Text>
      <Text style={{color:"white",marginTop:50}}
      onPress = {()=> navigation.navigate("SignUp") }
      >Pas de compte? S'inscrire</Text>
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

function mapDispatchToProps(dispatch){
  return{
    onSubmitToken : function(token){
      dispatch({type : 'tokenExist', token })
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Connection);