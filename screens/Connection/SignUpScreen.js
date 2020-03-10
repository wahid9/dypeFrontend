import React, { useState } from 'react';
import { StyleSheet,ImageBackground,Image,Text, KeyboardAvoidingView, Alert} from 'react-native';
import {Button, Input} from 'react-native-elements';
import { connect } from 'react-redux';

function Inscription({navigation}) {
  const [nom,setNom]= useState("");
  const [prenom,setPrenom]= useState("");
  const [email, setEmail]= useState("");
  const [mdp, setMdp]= useState("");
  const [mdpConfirm,setMdpConfirm]= useState("");
  
  var Register = async ()=> {
    if(mdp != mdpConfirm){
      Alert.alert("Mots de passe différents"," Veuillez saisir le meme mot de passe")
    }else{
    await fetch('http://10.2.5.181:3000/SingUp', {
    method: 'POST',
    headers: {'Content-Type':'application/x-www-form-urlencoded'},
    body: `nom=${nom}&prenom=${prenom}&email=${email}&mdp=${mdp}&mdpConfirm=${mdpConfirm}`
  })
    navigation.navigate("Criteres");}
  }
var Btn;
  if(nom == ""){
    Btn = <Button
    buttonStyle= {{backgroundColor: "#125CE0",borderRadius:5,paddingLeft:65,paddingRight:65}}
    title="S'inscrire"
    string = "#79d279"
    onPress = {()=> Alert.alert("Vous n'avez pas rempli tout le formulaire","Veuillez remplir tous les champs obligatoires")}
    />;
  }else if(prenom == ""){
    Btn = <Button
    buttonStyle= {{backgroundColor: "#125CE0",borderRadius:5,paddingLeft:65,paddingRight:65}}
    title="S'inscrire"
    string = "#79d279"
    onPress = {()=> Alert.alert("Vous n'avez pas rempli tout le formulaire"," Veuillez remplir tous les champs obligatoires")}
    />;  
  }else if(email == ""){
    Btn = <Button
    buttonStyle= {{backgroundColor: "#125CE0",borderRadius:5,paddingLeft:65,paddingRight:65}}
    title="S'inscrire"
    string = "#79d279"
    onPress = {()=> Alert.alert("Vous n'avez pas rempli tout le formulaire","Veuillez remplir tous les champs obligatoires")}
    />;  
  }else if(mdp == ""){
    Btn = <Button
    buttonStyle= {{backgroundColor: "#125CE0",borderRadius:5,paddingLeft:65,paddingRight:65}}
    title="S'inscrire"
    string = "#79d279"
    onPress = {()=> Alert.alert("Vous n'avez pas rempli tout le formulaire","Veuillez remplir tous les champs obligatoires")}
    />;  
  }else if(mdpConfirm == ""){
    Btn = <Button
    buttonStyle= {{backgroundColor: "#125CE0",borderRadius:5,paddingLeft:65,paddingRight:65}}
    title="S'inscrire"
    string = "#79d279"
    onPress = {()=> Alert.alert("Vous n'avez pas rempli tout le formulaire","Veuillez remplir tous les champs obligatoires")}
    />;
  }else{
    Btn = <Button
    buttonStyle= {{backgroundColor: "#125CE0",borderRadius:5,paddingLeft:65,paddingRight:65}}
    title="S'inscrire"
    string = "#79d279"
    onPress={() => { Register() }}
    />;
  }
  return (
    <ImageBackground source={require('../../assets/picture.jpg')}  style={styles.container}>
    <Image
        source= {require("../../assets/dype.png")}
        style={{height:115, width:222, marginTop:70}}
    />
    <Input containerStyle = {{marginBottom: 25, width: '70%'}} 
            inputStyle={{marginTop:80 ,backgroundColor:"white",borderRadius:5,paddingTop:2, opacity:0.7}}
            placeholder='Nom'
            onChangeText = {(value)=>setNom(value)}
            value = {nom}
            inputContainerStyle = "password"
            />
    <Input containerStyle = {{marginBottom: 25, width: '70%'}} 
            inputStyle={{ backgroundColor:"white",borderRadius:5,paddingTop:2, opacity:0.7}}
            placeholder='Prénom'
            onChangeText = {(value)=>setPrenom(value)}
            value = {prenom}
            />
    <Input containerStyle = {{marginBottom: 25, width: '70%'}} 
            inputStyle={{ backgroundColor:"white",borderRadius:5,paddingTop:2, opacity:0.7}}
            placeholder='Email'
            onChangeText = {(value)=>setEmail(value)}
            value = {email}
            />
    <Input containerStyle = {{marginBottom: 25, width: '70%'}} 
            inputStyle={{ backgroundColor:"white",borderRadius:5,paddingTop:2, opacity:0.7}}
            placeholder='Mot de passe'
            onChangeText = {(value)=>setMdp(value) }
            value = {mdp}
            />
    <Input containerStyle = {{marginBottom: 25, width: '70%'}} 
            inputStyle={{ backgroundColor:"white",borderRadius:5,paddingTop:2, opacity:0.7}}
            placeholder='Confirmation mot de passe'
            onChangeText = {(value)=>setMdpConfirm(value)}
            value = {mdpConfirm}
            />
            {Btn}
      <Text style={{color:"white",marginTop:50}}
      onPress = {()=> navigation.navigate("SignIn") }
      >Déja membre? Se connecter</Text>
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

export default Inscription;