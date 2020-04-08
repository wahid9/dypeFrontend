import React, {useState, useEffect,} from 'react';
import { StyleSheet, Text,ImageBackground,Image,KeyboardAvoidingView,Alert, AsyncStorage,View, TouchableOpacity} from 'react-native';
import {Button, Input} from 'react-native-elements';
import { set } from 'react-native-reanimated';
import { connect } from 'react-redux';
import { requestPermissionsAsync } from 'expo-camera';

function Connection({navigation,onSubmitToken}) {
  const [email, setEmail]= useState("");
  const [mdp, setMdp]= useState("");
  const [userMail,setUSerMail] = useState("")
  const[userMdp, setUserMdp] = useState("")

  
  useEffect(()=>{
    // AsyncStorage.getItem('email',(err,value)=>{
    //   setUSerMail(value);
    // })
    // AsyncStorage.getItem('mdp',(err,value)=>{
    //   setUserMdp(value);
    // })
    // setEmail(userMail);
    // setMdp(userMdp)
   
    AsyncStorage.clear()
  },[])
  
 
  
var signIn = async ()=> {
  var data = await fetch('http://192.168.0.21:3000/signIn', {
    method: 'POST',
    headers: {'Content-Type':'application/x-www-form-urlencoded'},
    body: `email=${email}&mdp=${mdp}`
  });
  console.log("hee",mdp,email)
  
  var response = await data.json();
  onSubmitToken(response.monToken)  
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
  }else if(userMail && userMdp){
    Btn = <Button
    buttonStyle= {{backgroundColor: "#125CE0",borderRadius:5,paddingLeft:65,paddingRight:65}}
    title="192.168.0.21 connecter"
    string = "#79d279" 
    onPress={() => {signIn();
      }}
/>
  } else{
  Btn =  <Button
          buttonStyle= {{backgroundColor: "#125CE0",borderRadius:5,paddingLeft:65,paddingRight:65}}
          title="Se connecter"
          string = "#79d279" 
          onPress={() => { signIn();
            AsyncStorage.setItem('email',email);
            AsyncStorage.setItem('mdp',mdp)}}
      />
  }
  var input;
  var input2;
  
  if(!userMail){
    input = <Input containerStyle = {{marginBottom: 25, width: '70%'}} 
    inputStyle={{ backgroundColor:"white",borderRadius:5,paddingTop:2, opacity:0.7}}
    placeholder='Email'
    onChangeText = {(value)=> setEmail(value)}
    value = {email}
    inputContainerStyle={{borderBottomWidth:0}}
    />
    input2 =  <Input containerStyle = {{marginBottom: 25, width: '70%'}} 
    inputStyle={{ backgroundColor:"white",borderRadius:5,paddingTop:2, opacity:0.7}}
    placeholder='Mot de passe'
    onChangeText = {(value)=> setMdp(value)}
    value = {mdp}
    inputContainerStyle={{borderBottomWidth:0}}
    />
  } 
  else{
    
  input = <Text h4 style={{marginBottom: 25, color: '#FFFFFF'}}>Welcome back {userMail},{userMdp}</Text>
  }
  return (
    <ImageBackground source={require('../../assets/picture.jpg')} style = {styles.container}>
       <Image
        source= {require("../../assets/dype.png")}
        style={{height:115, width:222, marginTop:60, marginBottom: 200}}
    />
      {input}
      {input2}
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
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Connection);