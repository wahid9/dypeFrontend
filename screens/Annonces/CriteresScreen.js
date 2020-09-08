import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Image, KeyboardAvoidingView,AsyncStorage,ScrollView } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

function Critere({navigation, token}) {

  const [ville, setVille] = useState("");
  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");


  useEffect(()=>{

      let notifToken;
      const registerForPushNotificationsAsync = async () =>{
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          console.log('je suis dans le if1')
          const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          console.log('je suis dans le if2')
          alert('Failed to get push token for push notification!');
          return;
        }
        notifToken = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(notifToken);
        sendTokenNotif()
      }

      var sendTokenNotif = async() =>{ 
        console.log('notifffff',notifToken)
        await fetch('http://172.20.10.3:3000/saveTokenNotif',{
          method: 'POST',
          headers: {'Content-Type':'application/x-www-form-urlencoded'},
          body:`notifToken=${notifToken}&token=${token}`
        })
      }

      registerForPushNotificationsAsync()
    },[])
  

  var select = async () => {
    var data = await fetch("http://172.20.10.3:3000/recherche", {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `ville=${ville}&budgetMin=${budgetMin}&budgetMax=${budgetMax}&token=${token}`
    });
    var response = await data.json()
    navigation.navigate('Drawer')
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Image
        source={require('../../assets/DYPE_noir_blanc.png')}
        style={{width: 125, height: 65, marginTop: '15%', marginBottom: '0%'}}
        />

      <View style={{width: '100%', alignItems: 'center'}}>
        <Text h4 style={{color: '#fce229', marginBottom: 20}}>
            Quels sont vos critères? 
        </Text>
        <Input containerStyle = {{width: '70%', marginBottom: 10}} 
          inputStyle={{ backgroundColor:"white", borderRadius:5, padding:5, opacity:0.9 }}
          placeholder='Dans quelle ville ?'
          inputContainerStyle={{borderBottomWidth: 0}}
          onChangeText = {(value)=> setVille(value)}
          value = {ville}
          inputContainerStyle={{borderBottomWidth:0}}
        />
        <Input containerStyle = {{width: '70%', marginBottom: 10}} 
          inputStyle={{ backgroundColor:"white", borderRadius:5, padding:5, opacity:0.9 }}
          placeholder='Votre budget min'
          inputContainerStyle={{borderBottomWidth: 0}}
          onChangeText = {(value)=> setBudgetMin(value)}
          value = {budgetMin}
          inputContainerStyle={{borderBottomWidth:0}}
        />
        <Input containerStyle = {{width: '70%', marginBottom: 10}} 
          inputStyle={{ backgroundColor:"white", borderRadius:5, padding:5, opacity:0.9 }}
          placeholder='Votre budget max'
          inputContainerStyle={{borderBottomWidth: 0}}
          onChangeText = {(value)=> setBudgetMax(value)}
          value = {budgetMax}
          inputContainerStyle={{borderBottomWidth:0}}
        />
      </View>

      <Button
        title="Suivant"
        buttonStyle={{backgroundColor: '#fce229', width: 100}}
        containerStyle={{flex: 0.2, alignSelf: 'flex-end', justifyContent: 'flex-end', marginRight: '5%', marginBottom: 20}}
        titleStyle={{color: '#282828'}}
        onPress = {()=> {select();
          AsyncStorage.setItem('ville', ville);
          AsyncStorage.setItem('budgetMin', budgetMin);
          AsyncStorage.setItem('budgetMax', budgetMax);} }
      />
      <KeyboardAvoidingView behavior = "padding" enabled>
      </KeyboardAvoidingView>
    </ScrollView>
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