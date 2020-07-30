import React, { useState } from 'react';
import { StyleSheet,ImageBackground,Image,Text, KeyboardAvoidingView, Alert} from 'react-native';
import {Button, Input} from 'react-native-elements';
import { connect } from 'react-redux';

function Inscription({navigation,onSubmitToken}) {
  const [nom,setNom]= useState("");
  const [prenom,setPrenom]= useState("");
  const [email, setEmail]= useState("");
  const [mdp, setMdp]= useState("");
  const [telephone, setTelephone]= useState("");
  const [birthday, setBirthday]= useState("");
  const [mdpConfirm,setMdpConfirm]= useState("");
  
  var Register = async ()=> {
    if(mdp != mdpConfirm){
      Alert.alert("Mots de passe différents"," Veuillez saisir le meme mot de passe")
    } else {
    var data = await fetch('http://192.168.43.201:3000/SingUp', {
    method: 'POST',
    headers: {'Content-Type':'application/x-www-form-urlencoded'},
    body: `nom=${nom}&prenom=${prenom}&email=${email}&mdp=${mdp}&mdpConfirm=${mdpConfirm}&telephone=${telephone}&birthday=${birthday}`
  })  
  var response = await data.json();
  console.log(response)
  onSubmitToken(response.newUser.token)
  navigation.navigate("Criteres");
   
  }
    
  
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
        style={{height:115, width:222, marginTop:40}}
    />
    <Input containerStyle = {{marginBottom: 25, width: '70%'}} 
            inputStyle={{marginTop:30,backgroundColor:"white",borderRadius:5,paddingTop:2, opacity:0.7}}
            placeholder='Nom'
            onChangeText = {(value)=>setNom(value)}
            value = {nom}
            inputContainerStyle={{borderBottomWidth:0}}
            />
    <Input containerStyle = {{marginBottom: 10, width: '70%'}} 
            inputStyle={{ backgroundColor:"white",borderRadius:5,paddingTop:2, opacity:0.7}}
            placeholder='Prénom'
            onChangeText = {(value)=>setPrenom(value)}
            value = {prenom}
            inputContainerStyle={{borderBottomWidth:0}}
            />
    <Input containerStyle = {{marginBottom: 10, width: '70%'}} 
            inputStyle={{ backgroundColor:"white",borderRadius:5,paddingTop:2, opacity:0.7}}
            placeholder='Numéro de téléphone'
            onChangeText = {(value)=>setTelephone(value)}
            value = {telephone}
            inputContainerStyle={{borderBottomWidth:0}}
            />
    <Input containerStyle = {{marginBottom: 10, width: '70%'}} 
            inputStyle={{ backgroundColor:"white",borderRadius:5,paddingTop:2, opacity:0.7}}
            placeholder='JJ/MM/AAAA'
            onChangeText = {(value)=>setBirthday(value)}
            value = {birthday}
            inputContainerStyle={{borderBottomWidth:0}}
            />
    <Input containerStyle = {{marginBottom:10, width: '70%'}} 
            inputStyle={{ backgroundColor:"white",borderRadius:5,paddingTop:2, opacity:0.7}}
            placeholder='Email'
            onChangeText = {(value)=>setEmail(value)}
            value = {email}
            inputContainerStyle={{borderBottomWidth:0}}
            />
    <Input containerStyle = {{marginBottom: 10, width: '70%'}} 
            inputStyle={{ backgroundColor:"white",borderRadius:5,paddingTop:2, opacity:0.7}}
            placeholder='Mot de passe'
            onChangeText = {(value)=>setMdp(value) }
            value = {mdp}
            inputContainerStyle={{borderBottomWidth:0}}
            />
    <Input containerStyle = {{marginBottom: 10, width: '70%'}} 
            inputStyle={{ backgroundColor:"white",borderRadius:5,paddingTop:2, opacity:0.7}}
            placeholder='Confirmation mot de passe'
            onChangeText = {(value)=>setMdpConfirm(value)}
            value = {mdpConfirm}
            inputContainerStyle={{borderBottomWidth:0}}
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
)(Inscription);

