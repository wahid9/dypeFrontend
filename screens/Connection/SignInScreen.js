import React, {useState, useEffect,} from 'react';
import { StyleSheet, Text,ImageBackground,Image,KeyboardAvoidingView,Alert, AsyncStorage} from 'react-native';
import {Button, Input} from 'react-native-elements';
import { set } from 'react-native-reanimated';
import { connect } from 'react-redux';
import { requestPermissionsAsync } from 'expo-camera';

function Connection({navigation, onSubmitToken, verifValidDossier}) {
  const [email, setEmail]= useState("");
  const [mdp, setMdp]= useState("");
  

  
  useEffect(()=>{


    // RECUPERATION DU STORAGE (VERIFICATION)
    // AsyncStorage.getItem('email',(err,value)=>{
    //   setEmail(value);
    // })
    // AsyncStorage.getItem('mdp',(err,value)=>{
    //   setMdp(value);
    // })
  },[])
  console.log('async',email,mdp)
 
var signIn = async ()=> {
  var data = await fetch('http://172.20.10.3:3000/signIn', {
    method: 'POST',
    headers: {'Content-Type':'application/x-www-form-urlencoded'},
    body: `email=${email}&mdp=${mdp}`
  });
  var response = await data.json(); 
  onSubmitToken(response.monToken);
  verifValidDossier(response.user.validationDossier);

  if(response.success == false){
    Alert.alert("Email ou mot de passe incorrects", "Veuillez saisir le bon email et mot de passe")
  }else{
    navigation.navigate('Criteres')
  }
}
  var Btn;
  if(email == ''){
    Btn = <Button
    buttonStyle= {{backgroundColor: "#AFC4ED",borderRadius:5,paddingLeft:65,paddingRight:65}}
    title="Se connecter"
    string = "#79d279" 
    onPress = {()=> Alert.alert("Remplissez vos champs de saisie","Veuillez saisir votre email et mot de passe")}/>
  }else if(mdp== ''){
    Btn = <Button
    buttonStyle= {{backgroundColor: "#D95A31",borderRadius:5,paddingLeft:65,paddingRight:65}}
    title="Se connecter"
    string = "#79d279" 
    onPress = {()=> Alert.alert("Remplissez vos champs de saisie", "Veuillez saisir votre email et mot de passe")}
    />
  } else{
  Btn =  <Button
          buttonStyle= {{backgroundColor: "#125CE0",borderRadius:5,paddingLeft:65,paddingRight:65}}
          title="Se connecter"
          string = "#79d279" 
          onPress={() => { signIn();
            // ENREGISTREMENT DU MAIL ; MP DANS LE TEL
            // AsyncStorage.setItem('email',email);
            // AsyncStorage.setItem('mdp',mdp)
          }}
      />
  }
  return (
    <ImageBackground source={require('../../assets/picture.jpg')} style = {styles.container}>
       <Image
        source= {require("../../assets/dype.png")}
        style={{height:115, width:222, marginTop:160, marginBottom: 80}}
    />
    <Input containerStyle = {{marginBottom: 25, width: '70%'}} 
        inputStyle={{ backgroundColor:"white",borderRadius:5,paddingTop:2, opacity:0.7}}
        placeholder='Email'
        onChangeText = {(value)=> setEmail(value)}
        value = {email}
        inputContainerStyle={{borderBottomWidth:0}}
        />
    <Input containerStyle = {{marginBottom: 25, width: '70%'}} 
        inputStyle={{ backgroundColor:"white",borderRadius:5,paddingTop:2, opacity:0.7}}
        placeholder='Mot de passe'
        onChangeText = {(value)=> setMdp(value)}
        value = {mdp}
        inputContainerStyle={{borderBottomWidth:0}}
        secureTextEntry={true}
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
    justifyContent: 'center'
  },
});

function mapDispatchToProps(dispatch){
  return{
    onSubmitToken : function(token){
      dispatch({type : 'tokenExist', token })
    },
    verifValidDossier : function(value){
      dispatch({type: 'onSignIn', value})
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Connection);