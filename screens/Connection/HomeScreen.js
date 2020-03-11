import React from 'react';
import { StyleSheet, Text, ImageBackground, Image} from 'react-native';
import {Button} from 'react-native-elements';

function HomePage({navigation}){
    return(
      <ImageBackground source={require('../../assets/picture.jpg')}  style={styles.container}>
        <Image
        source= {require("../../assets/dype.png")}
        style={{height:115, width:222, marginTop:-70}}
        />
        <Button
            buttonStyle= {{backgroundColor: "#D3455B",marginBottom:30, marginTop:200, borderRadius:5}}
            title="Se Connecter avec Google"
            string = "#79d279"
            onPress={() => { navigation.navigate('Drawer')}}
          />
           <Button
            buttonStyle= {{backgroundColor: "#125CE0", marginBottom:30,borderRadius:5, paddingLeft:50,paddingRight:50}}
            title="Se Connecter"
            string = "#79d279"
            onPress={() => { navigation.navigate('SignIn')}}
          /> 
          <Button
          buttonStyle= {{backgroundColor: "#125CE0",borderRadius:5,paddingLeft:65,paddingRight:65}}
          title="S'inscrire"
          string = "#79d279" 
          onPress={() => { navigation.navigate('SignUp')}}
        />
      </ImageBackground>
    )
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default HomePage;