import React from 'react';
import { StyleSheet, Text, ImageBackground, Image} from 'react-native';
import {Button} from 'react-native-elements';

function HomePage({navigation}){
    return(
      <ImageBackground source={require('../../assets/picture.jpg')}  style={styles.container}>
        <Image
        source= {require("../../assets/dype.png")}
        style={{height:150, width:290}}
        />
        <Button
            buttonStyle= {{backgroundColor: "#D3455B",marginBottom:30, marginTop:100, borderRadius:5,width:300,height:50}}
            title="Se connecter avec Google"
            string = "#79d279"
            onPress={() => { navigation.navigate('Drawer')}}
          />
           <Button
            buttonStyle= {{backgroundColor: "#125CE0", marginBottom:30,borderRadius:5, paddingLeft:50,paddingRight:50,width:300,height:50}}
            title="Se connecter"
            string = "#79d279"
            onPress={() => { navigation.navigate('SignIn')}}
          /> 
          <Button
          buttonStyle= {{backgroundColor: "#125CE0",borderRadius:5,paddingLeft:65,paddingRight:65,width:300,height:50}}
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