import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { Button, Tooltip, Overlay } from 'react-native-elements';
import IconAntDesing from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import FeatherIcon from 'react-native-vector-icons/Feather';
import IconBurger from '@expo/vector-icons/Feather';

import * as DocumentPicker from 'expo-document-picker';

function Dossier({onCameraClick, getDocuments, addDocument, docList, onClickDelete, navigation}) {

  const [listIDdata, setListIDdata] = useState([]);
  const [listJDdata, setListJDdata] = useState([]);
  const [listBSdata, setListBSdata] = useState([]);
  const [listCTdata, setListCTdata] = useState([]);
  const [listAIdata, setListAIdata] = useState([]);
  const [visible, setVisible] = useState(false);
  const [submitVisible, setSubmitVisible] = useState(false);
  const [tempDoc, setTempDoc] = useState({});


  useEffect(() => {
    const fetchData = async() => {
          // RECUPERE DANS LA BDD LES DOCUMENTS DEJA TELECHARGES PAR L'UTILISATEUR
          // BESOIN DE RENSEIGNER LE TOKEN UTILISATEUR
          //  §§ RENSEIGNER VOTRE ADRESSE IPv4 - COMMANDE IPCONFIG DANS POWERSHELL POUR WINDOWS §§

      var rawData = await fetch("http://10.2.5.181:3000/getDocuments");
      var data = await rawData.json();
      // setListIDdata(data.documents);
      getDocuments(data.documents);

      for(let i=0; i<docList.length; i++){
        if(docList[i].type[0]==='i' && docList[i].type[1]==='d'){
          setListIDdata( [...listIDdata, docList[i]] );
        }
      }

    }
    fetchData();
  }, []);
  

  // TELECHARGEMENT DE DOCUMENTS DEPUIS LE TELEPHONE: §§§ RESTE A VOIR AVEC LES IPHONES §§§

  const uploadFromPhone = async (docType) => {

    let documentFromPhone = await DocumentPicker.getDocumentAsync();

    // FONCTIONNE POUR TOUT MAIS DANS LE FUTUR REVOIR AU PROPRE LA GESTION TYPE DE FICHIER (JPEG - PDF, ETC...)

    var data = new FormData();
    data.append('doc', {
      uri: documentFromPhone.uri,
      type: 'image/jpeg',
      name: `${docType}+${documentFromPhone.name}`
    });

    //   POUR PASSER PLUS PROPRE LE TYPE DE FICHIER AU BACK -> A RECUPERER DANS LE REQ.BODY ET NON REQ.FILES

    // data.append('typedefichier', docType)

              //  §§ RENSEIGNER VOTRE ADRESSE IPv4 - COMMANDE IPCONFIG DANS POWERSHELL POUR WINDOWS §§
              // BESOIN DE RENSEIGNER LE TOKEN UTILISATEUR

    var rawResponse = await fetch("http://10.2.5.181:3000/uploadfromphone", {
      method: 'POST',
      body: data
    });
    var response = await rawResponse.json();

    addDocument(response.docUploaded);

  }


  // GERE LE PROBLEME DE FICHIER AVEC NOM TROP LONG
  const formatDocumentName = (doc) => {
    if(doc.length>35){
      var newString=doc.slice(3, 35);
      newString = newString+"...";
    } else {
      var newString=doc.slice(3);
    }
    return newString;
  }


  // FAUDRA FAIRE PASSER LE TOKEN     await fetch(`http://10.2.5.181:3000/deleteDocument/${props.token}/${tempDoc._id}`, {

  const deleteDocument = async () => {
    console.log('TEMPdoc :', tempDoc);
    let rawResponse = await fetch(`http://10.2.5.181:3000/deleteDocument/${tempDoc._id}`, {
      method: 'DELETE'
    })
    let response = await rawResponse.json();

    onClickDelete(tempDoc);

    if(tempDoc.type[0]==='i' && tempDoc.type[1]==='d'){
      setListIDdata(listIDdata.filter((e) => (e._id !== tempDoc._id) ));
    } else if(tempDoc.type[0]==='j' && tempDoc.type[1]==='d'){
      setListJDdata(listJDdata.filter((e) => (e._id !== tempDoc._id) ));
    } else if(tempDoc.type[0]==='b' && tempDoc.type[1]==='s'){
      setListBSdata(listBSdata.filter((e) => (e._id !== tempDoc._id) ));
    } else if(tempDoc.type[0]==='c' && tempDoc.type[1]==='t'){
      setListCTdata(listCTdata.filter((e) => (e._id !== tempDoc._id) ));
    } else if(tempDoc.type[0]==='a' && tempDoc.type[1]==='i'){
      setListAIdata(listAIdata.filter((e) => (e._id !== tempDoc._id) ));
    }
    setVisible(false);
  }

  // FILTRE DES DIFFERENTS TYPES DE DOCUMENTS DEPUIS DOCLIST DU STORE

  let tempListID=[];
  let tempListJD=[];
  let tempListBS=[];
  let tempListCT=[];
  let tempListAI=[];

  useEffect(()=>{
    for(let i=0; i<docList.length; i++){
      if(docList[i].type[0]==='i' && docList[i].type[1]==='d'){
        tempListID.push(docList[i]);
      } else if(docList[i].type[0]==='j' && docList[i].type[1]==='d'){
        tempListJD.push(docList[i]);
      } else if(docList[i].type[0]==='b' && docList[i].type[1]==='s'){
        tempListBS.push(docList[i]);
      } else if(docList[i].type[0]==='c' && docList[i].type[1]==='t'){
        tempListCT.push(docList[i]);
      } else if(docList[i].type[0]==='a' && docList[i].type[1]==='i'){
        tempListAI.push(docList[i]);
      }
    }
    setListIDdata(tempListID);
    setListJDdata(tempListJD);
    setListBSdata(tempListBS);
    setListCTdata(tempListCT);
    setListAIdata(tempListAI);
  }, [docList]);


  // MAP POUR ELEMENTS ID
  let listID = listIDdata.map(function(doc, i){
    return <View key={i} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <Text style={{marginLeft: 20, color:'#125ce0'}}> {formatDocumentName(doc.type)} </Text>
              <EvilIcons
                name='close'
                size={30}
                style={{marginLeft: 10, marginRight: 5}}
                onPress={()=>{
                  setVisible(true);
                  setTempDoc(doc);
                }}
              />
            </View>
  })


  // MAP POUR ELEMENTS JUSTIF IDENTITE
  let listJD = listJDdata.map(function(doc, i){
    return <View key={i} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <Text style={{marginLeft: 20, color:'#125ce0'}}>{formatDocumentName(doc.type)}</Text>
              <EvilIcons
                name='close'
                size={30}
                style={{marginLeft: 10, marginRight: 5}}
                onPress={()=>{
                  setVisible(true);
                  setTempDoc(doc);
                }}
              />
            </View>
  });

  // MAP POUR ELEMENTS BULLETINS DE SALAIRE
  let listBS = listBSdata.map(function(doc, i){
    return <View key={i} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <Text style={{marginLeft: 20, color:'#125ce0'}}>{formatDocumentName(doc.type)}</Text>
              <EvilIcons
                name='close'
                size={30}
                style={{marginLeft: 10, marginRight: 5}}
                onPress={()=>{
                  setVisible(true);
                  setTempDoc(doc);
                }}
              />
            </View>
  });

  // MAP POUR ELEMENTS CONTRAT DE TRAVAIL
  let listCT = listCTdata.map(function(doc, i){
    return <View key={i} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <Text style={{marginLeft: 20, color:'#125ce0'}}>{formatDocumentName(doc.type)}</Text>
              <EvilIcons
                name='close'
                size={30}
                style={{marginLeft: 10, marginRight: 5}}
                onPress={()=>{
                  setVisible(true);
                  setTempDoc(doc);
                }}
              />
            </View>
  });

  // MAP POUR ELEMENTS AVIS IMPOSITION
  let listAI = listAIdata.map(function(doc, i){
    return <View key={i} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <Text style={{marginLeft: 20, color:'#125ce0'}}>{formatDocumentName(doc.type)}</Text>
              <EvilIcons
                name='close'
                size={30}
                style={{marginLeft: 10, marginRight: 5}}
                onPress={()=>{
                  setVisible(true);
                  setTempDoc(doc);
                }}
              />
            </View>
  });

  return (
    <ScrollView style={{marginTop: 25}}>

      <IconBurger name= {"menu"} style={{marginLeft: 20, marginTop: 20}} color={'#125ce0'} size={35} onPress={() => navigation.openDrawer()} />
      <View style={{flexDirection:'row',alignItems:'center',alignSelf:'center'}}>
      <Image source={require('../../assets/Dypebleu.png')}  style={{height:66, width:127, marginBottom:30,}}/>
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
        <Text style={{color: '#282828', marginLeft: '5%', marginRight: 10, textAlign: 'center', fontWeight: 'bold'}}>
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
      
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 10, marginRight: 10}}>
        <Text>
          Ajouter un fichier:
        </Text>
        <IconAntDesing
          name='addfile'
          size={25}
          style={{marginLeft: 10, marginRight: 10, color: '#125ce0'}}
          onPress={ async () => {
            uploadFromPhone('id');
          }}
        />
        <SimpleLineIcons
          name='camera'
          size={30}
          style={{color: '#125ce0'}}
          onPress={ () => {
            onCameraClick('id');
            navigation.navigate('Camera');
          }}
        />
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginTop: 20}}>
        <Text style={{color: '#282828', marginLeft: '5%', marginRight: 10, textAlign: 'center', fontWeight: 'bold'}}>
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

      {listJD}

      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 10, marginRight: 10}}>
        <Text>
          Ajouter un fichier:
        </Text>
        <IconAntDesing
          name='addfile'
          size={25}
          style={{marginLeft: 10, marginRight: 10, color: '#125ce0'}}
          onPress={ async () => {
            uploadFromPhone('jd');
          }}
        />
        <SimpleLineIcons
          name='camera'
          size={30}
          style={{color: '#125ce0'}}
          onPress={ () => {
            onCameraClick('jd');
            navigation.navigate('Camera');
          }}
        />
      </View>


      <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginTop: 20}}>
        <Text style={{color: '#282828', marginLeft: '5%', marginRight: 10, textAlign: 'center', fontWeight: 'bold'}}>
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

      {listBS}

      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 10, marginRight: 10}}>
        <Text>
          Ajouter un fichier:
        </Text>
        <IconAntDesing
          name='addfile'
          size={25}
          style={{marginLeft: 10, marginRight: 10, color: '#125ce0'}}
          onPress={ async () => {
            uploadFromPhone('bs');
          }}
        />
        <SimpleLineIcons
          name='camera'
          size={30}
          style={{color: '#125ce0'}}
          onPress={ () => {
            onCameraClick('bs');
            navigation.navigate('Camera');
          }}
        />
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginTop: 20}}>
        <Text style={{color: '#282828', marginLeft: '5%', marginRight: 10, textAlign: 'center', fontWeight: 'bold'}}>
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

      {listCT}

      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 10, marginRight: 10}}>
        <Text>
          Ajouter un fichier:
        </Text>
        <IconAntDesing
          name='addfile'
          size={25}
          style={{marginLeft: 10, marginRight: 10, color: '#125ce0'}}
          onPress={ async () => {
            uploadFromPhone('ct');
          }}
        />
        <SimpleLineIcons
          name='camera'
          size={30}
          style={{color: '#125ce0'}}
          onPress={ () => {
            onCameraClick('ct');
            navigation.navigate('Camera');
          }}
        />
      </View>


      <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginTop: 20}}>
        <Text style={{color: '#282828', marginLeft: '5%', marginRight: 10, textAlign: 'center', fontWeight: 'bold'}}>
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

      {listAI}

      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 10, marginRight: 10}}>
        <Text>
          Ajouter un fichier:
        </Text>
        <IconAntDesing
          name='addfile'
          size={25}
          style={{marginLeft: 10, marginRight: 10, color: '#125ce0'}}
          onPress={ async () => {
            uploadFromPhone('ai');
          }}
        />
        <SimpleLineIcons
          name='camera'
          size={30}
          style={{color: '#125ce0'}}
          onPress={ () => {
            onCameraClick('ai');
            navigation.navigate('Camera');
          }}
        />
      </View>


      <Button
        title="Soumettre le dossier"
        buttonStyle={{backgroundColor: '#fce229', width: 'auto', padding: 10}}
        containerStyle={{alignSelf: 'flex-end', justifyContent: 'flex-end', marginRight: '5%', marginTop: 30, marginBottom: 20}}
        titleStyle={{color: '#282828', fontSize: 14}}
        onPress={()=>setSubmitVisible(true)}
      />


      <Overlay isVisible={visible} width='80%' height='auto'>
        <View>
          <Text>Etes-vous sûr de vouloir supprimer ce fichier?</Text>
          <Button
            title="Valider la suppresion"
            buttonStyle={{backgroundColor: '#125ce0', width: 'auto', padding: 10}}
            containerStyle={{justifyContent: 'flex-end', marginTop: 30, marginBottom: 5}}
            titleStyle={{fontSize: 14}}
            onPress={()=>deleteDocument()}
          />
          <Button
            title="Annuler"
            buttonStyle={{backgroundColor: '#125ce0', width: 'auto', padding: 10}}
            containerStyle={{justifyContent: 'flex-end', marginTop: 5, marginBottom: 10}}
            titleStyle={{fontSize: 14}}
            onPress={()=>setVisible(false)}
          />
        </View>
      </Overlay>

      <Overlay isVisible={submitVisible} width='80%' height='auto' onBackdropPress={()=>setSubmitVisible(false)}>
          <View style={{alignItems: 'center'}}>
            <FeatherIcon
              name='folder-plus'
              size={40}
              style={{color: '#125ce0', marginBottom: 30}}
            />
            <Text>
              Votre dossier a bien été soumis à notre équipe. Nous revenons vers vous dès que possible!
            </Text>
          </View>
      </Overlay>

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
  return { docList: state.docList }
}


function mapDispatchToProps(dispatch){
  return {
    onCameraClick: function(docType){
      dispatch({type: 'saveDocType', docType});
    },
    getDocuments: function(documents){
      dispatch({type: 'getDocuments', documents});
    },
    addDocument: function(document){
      dispatch({type: 'addDocument', document});
    },
    onClickDelete: function(document){
      dispatch({type: 'deleteDocument', document})
    }
  }
}



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dossier)
