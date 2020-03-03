import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Input, Button } from 'react-native-elements';

function Questionnaire1Screen({navigation}) {
  return (
    <View style={styles.container}>

      <Image
        source={require('../../assets/DYPE_noir_blanc.png')}
        style={{width: 125, height: 65, marginTop: '15%', marginBottom: '10%'}}
      />

      <Text style={{color: 'white', alignItems: 'center', textAlign: 'center', marginLeft: '10%', marginRight: '10%', marginBottom: '5%'}}>
        Merci de remplir le questionnaire afin d'acceder aux annonces
      </Text>

      <Text style={{width: '100%', color: '#fce229', marginLeft: '15%', marginBottom: '5%'}}>
        Question 1
      </Text>

      <Text style={{width: '80%', color: 'white', marginLeft: '10%', marginRight: '10%', marginBottom: '5%'}}>
      Ac ne quis a nobis hoc ita dici forte miretur, quod alia quaedam in hoc facultas sit ingeni, neque haec dicendi ratio aut disciplina, ne nos quidem huic uni studio penitus umquam dediti fuimus. Etenim omnes artes, quae ad humanitatem pertinent, habent quoddam commune vinculum, et quasi cognatione quadam inter se continentur.
      </Text>

      <Input containerStyle = {{marginBottom: 25, width: '70%'}} 
        inputStyle={{ backgroundColor:"white", borderRadius:5, padding:5, opacity:0.7 }}
        placeholder='Réponse'
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

export default Questionnaire1Screen;
