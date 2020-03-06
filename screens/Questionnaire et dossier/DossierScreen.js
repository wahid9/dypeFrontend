import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { Input, Button, Tooltip } from 'react-native-elements';
import IconAntDesing from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import IconBurger from '@expo/vector-icons/Feather';

import * as DocumentPicker from 'expo-document-picker';


function Dossier({onCameraClick, navigation}) {

  const [countID, setCountID] = useState(1);
  const [listIDdata, setListIDdata] = useState([]);


  const uploadFromPhone = async (docType) => {

    let documentFromPhone = await DocumentPicker.getDocumentAsync();
    console.log('documentFromPhone :', documentFromPhone);

    // FONCTIONNE POUR TOUT MAIS DANS LE FUTUR REVOIR AU PROPRE LA GESTION TYPE DE FICHIER (JPEG - PDF, ETC...)

    var data = new FormData();
    data.append('doc', {
      uri: documentFromPhone.uri,
      type: 'image/jpeg',
      name: `${docType}`
    });

    console.log('data :', data);

    //  §§ RENSEIGNER VOTRE ADRESSE IPv4 - COMMANDE IPCONFIG DANS POWERSHELL POUR WINDOWS §§

    var rawResponse = await fetch("http://10.2.5.181:3000/uploadfromphone", {
      method: 'POST',
      body: data
    });
    var response = await rawResponse.json();

    console.log("REP", response);

    setListIDdata([...listIDdata, response]);

  }


  let listID = listIDdata.map(function(doc, i){
    return <View key={i} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <Text style={{marginLeft: 20, color:'#125ce0'}}>fichier téléchargé</Text>
              <EvilIcons
                name='close'
                size={30}
                style={{marginLeft: 10, marginRight: 5}}
              />
            </View>
  })


  return (
    <ScrollView style={{marginTop: 25}}>

      <IconBurger name= {"menu"} style={{marginLeft: 20, marginTop: 20}} color={'#125ce0'} size={35} onPress={() => navigation.openDrawer()} />
      <View style={{flexDirection:'row',alignItems:'center',alignSelf:'center'}}>
      <Image source={require('../../assets/Dypebleu.png')}  style={{height:66, width:127, marginBottom:30,}}/>
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
        <Text style={{color: '#282828', marginLeft: '5%', marginRight: 10, textAlign: 'center'}}>
          Justificatif d'identité
        </Text>
        <Tooltip 
          popover={
            <Text  style={{color: '#125ce0'}}>Pièce justificative d'identité en cours de validité comportant la photographie et la signature du titulaire: Carte nationale d'identité / carte de séjour / permis de conduire... </Text>
          }
          containerStyle={{height: 'auto', width: '50%', backgroundColor: '#dfe6e9'}}
          pointerColor={'#dfe6e9'}
        >
          <SimpleLineIcons
            name='info'
            size={15}
            style={{color: '#125ce0'}}
          />
        </Tooltip>
      </View>

      {listID}

      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10}}>
      <Input
        containerStyle = {{marginRight: 10, height: 40, width: '45%', borderWidth: 1, borderRadius: 5, borderColor: '#E5E5E5', justifyContent: 'center', padding: 0}} 
        inputStyle={{paddingTop:2, fontSize: 16, height: 30}}
        inputContainerStyle={{borderBottomWidth: 0}}
        placeholder='fichier.jpg'
      />
      <Button
        title="Télécharger"
        buttonStyle={{backgroundColor: '#125ce0', width: 95, height: 40}}
        containerStyle={{marginRight: 10}}
        titleStyle={{color: 'white', fontSize: 14}}
        onPress={ async () => {
          uploadFromPhone('id');
        }}
      />
      <SimpleLineIcons
        name='camera'
        size={30}
        onPress={ () => {
          // onCameraClick();
          navigation.navigate('Camera')
        }}
      />
      <EvilIcons
        name='close'
        size={30}
        style={{marginLeft: 10}}
        onPress={() => setCountID(countID-1)}
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
          onPress={() => setCountID(countID+1)}
        />
      </View>


      <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginTop: 20}}>
        <Text style={{color: '#282828', marginLeft: '5%', marginRight: 10, textAlign: 'center'}}>
          Justificatif de domicile
        </Text>
        <Tooltip 
          popover={
            <Text  style={{color: '#125ce0'}}>Fournir les trois dernières quittances de loyer du logement occupé ou, à défaut, l'attestation du précédent bailleur indiquant que vous êtes à jour de vos loyers et charges.
            </Text>
          }
          containerStyle={{height: 'auto', width: '50%', backgroundColor: '#dfe6e9'}}
          pointerColor={'#dfe6e9'}
        >
          <SimpleLineIcons
            name='info'
            size={15}
            style={{color: '#125ce0'}}
          />
        </Tooltip>
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <Input
          containerStyle = {{marginRight: 10, height: 40, width: '45%', borderWidth: 1, borderRadius: 5, borderColor: '#E5E5E5', justifyContent: 'center', padding: 0}} 
          inputStyle={{paddingTop:2, fontSize: 16, height: 30}}
          inputContainerStyle={{borderBottomWidth: 0}}
          placeholder='piece_1.pdf'
        />
        <Button
          title="Télécharger"
          buttonStyle={{backgroundColor: '#125ce0', width: 95, height: 40}}
          containerStyle={{marginRight: 10}}
          titleStyle={{color: 'white', fontSize: 14}}
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
          containerStyle = {{marginRight: 10, height: 40, width: '45%', borderWidth: 1, borderRadius: 5, borderColor: '#E5E5E5', justifyContent: 'center', padding: 0}} 
          inputStyle={{paddingTop:2, fontSize: 16, height: 30}}
          inputContainerStyle={{borderBottomWidth: 0}}
          placeholder='piece_2.jpg'
        />
        <Button
          title="Télécharger"
          buttonStyle={{backgroundColor: '#125ce0', width: 95, height: 40}}
          containerStyle={{marginRight: 10}}
          titleStyle={{color: 'white', fontSize: 14}}
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
        <Text style={{color: '#282828', marginLeft: '5%', marginRight: 10, textAlign: 'center'}}>
          Bulletins de salaire
        </Text>
        <Tooltip 
          popover={
            <Text  style={{color: '#125ce0'}}>Fournir les trois derniers bulletins de salaire.
            </Text>
          }
          containerStyle={{height: 'auto', width: '50%', backgroundColor: '#dfe6e9'}}
          pointerColor={'#dfe6e9'}
        >
          <SimpleLineIcons
            name='info'
            size={15}
            style={{color: '#125ce0'}}
          />
        </Tooltip>
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <Input
          containerStyle = {{marginRight: 10, height: 40, width: '45%', borderWidth: 1, borderRadius: 5, borderColor: '#E5E5E5', justifyContent: 'center', padding: 0}} 
          inputStyle={{paddingTop:2, fontSize: 16, height: 30}}
          inputContainerStyle={{borderBottomWidth: 0}}
          placeholder='Janvier_2020.pdf'
        />
        <Button
          title="Télécharger"
          buttonStyle={{backgroundColor: '#125ce0', width: 95, height: 40}}
          containerStyle={{marginRight: 10}}
          titleStyle={{color: 'white', fontSize: 14}}
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
          containerStyle = {{marginRight: 10, height: 40, width: '45%', borderWidth: 1, borderRadius: 5, borderColor: '#E5E5E5', justifyContent: 'center', padding: 0}} 
          inputStyle={{paddingTop:2, fontSize: 16, height: 30}}
          inputContainerStyle={{borderBottomWidth: 0}}
          placeholder='Dec_2019.jpg'
        />
        <Button
          title="Télécharger"
          buttonStyle={{backgroundColor: '#125ce0', width: 95, height: 40}}
          containerStyle={{marginRight: 10}}
          titleStyle={{color: 'white', fontSize: 14}}
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
          containerStyle = {{marginRight: 10, height: 40, width: '45%', borderWidth: 1, borderRadius: 5, borderColor: '#E5E5E5', justifyContent: 'center', padding: 0}} 
          inputStyle={{paddingTop:2, fontSize: 16, height: 30}}
          inputContainerStyle={{borderBottomWidth: 0}}
          placeholder='Nov_2019.jpg'
        />
        <Button
          title="Télécharger"
          buttonStyle={{backgroundColor: '#125ce0', width: 95, height: 40}}
          containerStyle={{marginRight: 10}}
          titleStyle={{color: 'white', fontSize: 14}}
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
        <Text style={{color: '#282828', marginLeft: '5%', marginRight: 10, textAlign: 'center'}}>
          Contrat de travail
        </Text>
        <Tooltip 
          popover={
            <Text  style={{color: '#125ce0'}}>A défaut une attestation de l'employeur précisant l'emploi et la rémunération proposée, la date d'entrée en fonctions envisagée.
            </Text>
          }
          containerStyle={{height: 'auto', width: '50%', backgroundColor: '#dfe6e9'}}
          pointerColor={'#dfe6e9'}
        >
          <SimpleLineIcons
            name='info'
            size={15}
            style={{color: '#125ce0'}}
          />
        </Tooltip>
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <Input
          containerStyle = {{marginRight: 10, height: 40, width: '45%', borderWidth: 1, borderRadius: 5, borderColor: '#E5E5E5', justifyContent: 'center', padding: 0}} 
          inputStyle={{paddingTop:2, fontSize: 16, height: 30}}
          inputContainerStyle={{borderBottomWidth: 0}}
          placeholder='fichier.pdf'
        />
        <Button
          title="Télécharger"
          buttonStyle={{backgroundColor: '#125ce0', width: 95, height: 40}}
          containerStyle={{marginRight: 10}}
          titleStyle={{color: 'white', fontSize: 14}}
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
        <Text style={{color: '#282828', marginLeft: '5%', marginRight: 10, textAlign: 'center'}}>
          Dernier avis d'imposition
        </Text>
        <Tooltip 
          popover={
            <Text  style={{color: '#125ce0'}}>Ou de non-imposition.
            </Text>
          }
          containerStyle={{height: 'auto', width: '50%', backgroundColor: '#dfe6e9'}}
          pointerColor={'#dfe6e9'}
        >
          <SimpleLineIcons
            name='info'
            size={15}
            style={{color: '#125ce0'}}
          />
        </Tooltip>
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <Input
          containerStyle = {{marginRight: 10, height: 40, width: '45%', borderWidth: 1, borderRadius: 5, borderColor: '#E5E5E5', justifyContent: 'center', padding: 0}} 
          inputStyle={{paddingTop:2, fontSize: 16, height: 30}}
          inputContainerStyle={{borderBottomWidth: 0}}
          placeholder='avis_imposition.pdf'
        />
        <Button
          title="Télécharger"
          buttonStyle={{backgroundColor: '#125ce0', width: 95, height: 40}}
          containerStyle={{marginRight: 10}}
          titleStyle={{color: 'white', fontSize: 14}}
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


      <Button
        title="Soumettre le dossier"
        buttonStyle={{backgroundColor: '#fce229', width: 'auto', padding: 10}}
        containerStyle={{alignSelf: 'flex-end', justifyContent: 'flex-end', marginRight: '5%', marginTop: 30, marginBottom: 20}}
        titleStyle={{color: '#282828', fontSize: 14}}
      />

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


function mapDispatchToProps(dispatch){
  return {
    onCameraClick: function(docType){
      dispatch({type: 'saveDocType', docType})
    }
  }
}



export default connect(
  null,
  mapDispatchToProps
)(Dossier)
