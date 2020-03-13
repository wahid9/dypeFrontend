import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Image, KeyboardAvoidingView } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { connect } from 'react-redux';

function Critere({navigation, token}) {

  const [ville, setVille] = useState("");
  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");

  var select = async () => {
    var data = await fetch("http://10.2.5.181:3000/recherche", {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `ville=${ville}&budgetMin=${budgetMin}&budgetMax=${budgetMax}&token=${token}`
    });
    var response = await data.json()
    navigation.navigate('Drawer')
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/DYPE_noir_blanc.png')}
        style={{width: 125, height: 65, marginTop: '15%', marginBottom: '0%'}}
        />
        <Text h4 style={{color: '#fce229'}}>
            Vos critères 
        </Text>
      <Input containerStyle = {{marginBottom: -40, width: '70%'}} 
        inputStyle={{ backgroundColor:"white", borderRadius:5, padding:5, opacity:0.9 }}
        placeholder='Dans quelle ville ?'
        inputContainerStyle={{borderBottomWidth: 0}}
        onChangeText = {(value)=> setVille(value)}
        value = {ville}
        inputContainerStyle={{borderBottomWidth:0}}
      />
      <Input containerStyle = {{marginBottom: -40, width: '70%'}} 
        inputStyle={{ backgroundColor:"white", borderRadius:5, padding:5, opacity:0.9 }}
        placeholder='Votre budget min'
        inputContainerStyle={{borderBottomWidth: 0}}
        onChangeText = {(value)=> setBudgetMin(value)}
        value = {budgetMin}
        inputContainerStyle={{borderBottomWidth:0}}
      />
      <Input containerStyle = {{marginBottom: -40, width: '70%'}} 
        inputStyle={{ backgroundColor:"white", borderRadius:5, padding:5, opacity:0.9 }}
        placeholder='Votre budget max'
        inputContainerStyle={{borderBottomWidth: 0}}
        onChangeText = {(value)=> setBudgetMax(value)}
        value = {budgetMax}
        inputContainerStyle={{borderBottomWidth:0}}
      />
      <Button
        title="Suivant"
        buttonStyle={{backgroundColor: '#fce229', width: 100}}
        containerStyle={{flex: 0.2, alignSelf: 'flex-end', justifyContent: 'flex-end', marginRight: '5%', marginBottom:'5%'}}
        titleStyle={{color: '#282828'}}
        onPress = {()=> select() }
      />
      <KeyboardAvoidingView behavior = "padding" enabled>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#125ce0',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
});

function mapStateToProps(state){
  return { token: state.token }
}

export default connect(
   mapStateToProps,
    null)(Critere);