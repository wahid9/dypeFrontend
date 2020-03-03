import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { Input, Button } from 'react-native-elements';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconAntDesing from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'


export default function App() {
  return (
    <ScrollView contentContainerStyle={{flex: 1}}>

      <Image
        source={require('../../assets/Dypebleu.png')}
        style={{alignSelf: 'center', width: 125, height: 65, marginTop: '15%', marginBottom: '10%'}}
      />

      <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
        <Text style={{color: '#282828', marginLeft: '5%', textAlign: 'center'}}>
          Pièce d'identité
        </Text>
        <SimpleLineIcons
          name='info'
          size={15}
          style={{marginLeft: 10, color: '#125ce0'}}
        />
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <Input
          containerStyle = {{marginRight: 10, height: 45, width: '45%', borderWidth: 1, borderRadius: 5, borderColor: '#E5E5E5'}} 
          inputStyle={{backgroundColor:"white", paddingTop:2}}
          inputContainerStyle={{borderBottomWidth: 0}}
          placeholder='CNI_recto.jpg'
        />
        <Button
          title="Télécharger"
          buttonStyle={{backgroundColor: '#125ce0', width: 90, height: 45}}
          containerStyle={{marginRight: 10}}
          titleStyle={{color: 'white', fontSize: 13}}
        />
        <SimpleLineIcons
          name='camera'
          size={30}
          onPress={() => { navigation.navigate('Camera')}}
        />
        <EvilIcons
          name='close'
          size={30}
          style={{marginLeft: 10}}
        />
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10}}>
        <Input
          containerStyle = {{marginRight: 10, height: 45, width: '45%', borderWidth: 1, borderRadius: 5, borderColor: '#E5E5E5'}} 
          inputStyle={{backgroundColor:"white", paddingTop:2}}
          inputContainerStyle={{borderBottomWidth: 0}}
          placeholder='CNI_recto.jpg'
        />
        <Button
          title="Télécharger"
          buttonStyle={{backgroundColor: '#125ce0', width: 90, height: 45}}
          containerStyle={{marginRight: 10}}
          titleStyle={{color: 'white', fontSize: 13}}
        />
        <SimpleLineIcons
          name='camera'
          size={30}
        />
        <EvilIcons
          name='close'
          size={30}
          style={{marginLeft: 10}}
        />
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 10, marginRight: 50}}>
        <Text>
          Ajouter un fichier:
        </Text>
        <IconAntDesing
          name='addfile'
          size={25}
          style={{marginLeft: 10, color: '#125ce0'}}
        />
      </View>


      <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginTop: 20}}>
        <Text style={{color: '#282828', marginLeft: '5%', textAlign: 'center'}}>
          Pièce d'identité
        </Text>
        <SimpleLineIcons
          name='info'
          size={15}
          style={{marginLeft: 10, color: '#125ce0'}}
        />
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <Input
          containerStyle = {{marginRight: 10, height: 45, width: '45%', borderWidth: 1, borderRadius: 5, borderColor: '#E5E5E5'}} 
          inputStyle={{backgroundColor:"white", paddingTop:2}}
          inputContainerStyle={{borderBottomWidth: 0}}
          placeholder='CNI_recto.jpg'
        />
        <Button
          title="Télécharger"
          buttonStyle={{backgroundColor: '#125ce0', width: 90, height: 45}}
          containerStyle={{marginRight: 10}}
          titleStyle={{color: 'white', fontSize: 13}}
        />
        <SimpleLineIcons
          name='camera'
          size={30}
        />
        <EvilIcons
          name='close'
          size={30}
          style={{marginLeft: 10}}
        />
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10}}>
        <Input
          containerStyle = {{marginRight: 10, height: 45, width: '45%', borderWidth: 1, borderRadius: 5, borderColor: '#E5E5E5'}} 
          inputStyle={{backgroundColor:"white", paddingTop:2}}
          inputContainerStyle={{borderBottomWidth: 0}}
          placeholder='CNI_recto.jpg'
        />
        <Button
          title="Télécharger"
          buttonStyle={{backgroundColor: '#125ce0', width: 90, height: 45}}
          containerStyle={{marginRight: 10}}
          titleStyle={{color: 'white', fontSize: 13}}
        />
        <SimpleLineIcons
          name='camera'
          size={30}
        />
        <EvilIcons
          name='close'
          size={30}
          style={{marginLeft: 10}}
        />
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 10, marginRight: 50}}>
        <Text>
          Ajouter un fichier:
        </Text>
        <IconAntDesing
          name='addfile'
          size={25}
          style={{marginLeft: 10, color: '#125ce0'}}
        />
      </View>

      
      

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


