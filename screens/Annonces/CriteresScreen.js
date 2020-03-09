import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';

function Critere({navigation}) {
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
      />
      <Input containerStyle = {{marginBottom: -40, width: '70%'}} 
        inputStyle={{ backgroundColor:"white", borderRadius:5, padding:5, opacity:0.9 }}
        placeholder='Votre budget'
        inputContainerStyle={{borderBottomWidth: 0}}
      />
      <Input containerStyle = {{marginBottom: -40, width: '70%'}} 
        inputStyle={{ backgroundColor:"white", borderRadius:5, padding:5, opacity:0.9 }}
        placeholder='Pièces min'
        inputContainerStyle={{borderBottomWidth: 0}}
      />
      <Input containerStyle = {{marginBottom: 0, width: '70%'}} 
        inputStyle={{ backgroundColor:"white", borderRadius:5, padding:5, opacity:0.9 }}
        placeholder='Surface min'
        inputContainerStyle={{borderBottomWidth: 0}}
      />

      <Button
        title="Suivant"
        buttonStyle={{backgroundColor: '#fce229', width: 100}}
        containerStyle={{flex: 0.2, alignSelf: 'flex-end', justifyContent: 'flex-end', marginRight: '5%', marginBottom:'5%'}}
        titleStyle={{color: '#282828'}}
        onPress = {()=> navigation.navigate('Match') }
      />

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

export default Critere;