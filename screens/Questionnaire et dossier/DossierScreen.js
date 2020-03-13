import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { Button, Tooltip, Overlay } from 'react-native-elements';
import IconAntDesing from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import FeatherIcon from 'react-native-vector-icons/Feather';
import IconBurger from '@expo/vector-icons/Feather';
import IconRefresh from '@expo/vector-icons/Feather'

import * as DocumentPicker from 'expo-document-picker';

function Dossier({onCameraClick, getDocumentsOnInit, addDocument, docList, onClickDelete, navigation, token}) {

  const [listIDdata, setListIDdata] = useState([]);
  const [listJDdata, setListJDdata] = useState([]);
  const [listBSdata, setListBSdata] = useState([]);
  const [listCTdata, setListCTdata] = useState([]);
  const [listAIdata, setListAIdata] = useState([]);
  const [visible, setVisible] = useState(false);
  const [submitVisible, setSubmitVisible] = useState(false);
  const [tempDoc, setTempDoc] = useState({});
  const [tempDocList, setTempDocList] = useState([]);
  const [chargementVisible, setChargementVisible] = useState(false)


  // RECUPERE DANS LA BDD LES DOCUMENTS DEJA TELECHARGES PAR L'UTILISATEUR A L'INITIALISATION DU COMPONENT
  useEffect(() => {
    const fetchData = async() => {
          //  §§ RENSEIGNER VOTRE ADRESSE IPv4 - COMMANDE IPCONFIG DANS POWERSHELL POUR WINDOWS §§
      
      var rawData = await fetch(`http://10.2.5.209:3000/getDocuments/${token}`);
      var data = await rawData.json();
      getDocumentsOnInit(data.documents);

    }
    fetchData();
  }, []);
  

  // TELECHARGEMENT DE DOCUMENTS DEPUIS LE TELEPHONE: §§§ RESTE A VOIR COMPATIBILITE AVEC LES IPHONES §§§

  const uploadFromPhone = async (docType) => {

    let documentFromPhone = await DocumentPicker.getDocumentAsync();

    // FONCTIONNE POUR TOUT MAIS DANS LE FUTUR REVOIR AU PROPRE LA GESTION TYPE DE FICHIER (JPEG - PDF, ETC...)
    setChargementVisible(true)
    var data = new FormData();
    data.append('doc', {
      uri: documentFromPhone.uri,
      type: 'image/jpeg',
      name: `${docType}+${documentFromPhone.name}`
    });

    //   POUR PASSER PLUS PROPRE LE TYPE DE FICHIER AU BACK -> A RECUPERER DANS LE REQ.BODY ET NON REQ.FILES

    // data.append('typedefichier', docType)

              //  §§ RENSEIGNER VOTRE ADRESSE IPv4 - COMMANDE IPCONFIG DANS POWERSHELL POUR WINDOWS §§
    
    data.append('token', token)
    var rawResponse = await fetch("http://10.2.5.209:3000/uploadfromphone", {
      method: 'POST',
      body: data
    });
    var response = await rawResponse.json();

    addDocument(response.docUploaded);
    setChargementVisible(false)

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

// SUPPRESSION DE DOCUMENTS
  const deleteDocument = async () => {
    let rawResponse = await fetch(`http://10.2.5.209:3000/deleteDocument/${token}/${tempDoc._id}`, {
      method: 'DELETE'
    })
    let response = await rawResponse.json();

    // SUPPRESSION DANS LE STORE
    onClickDelete(tempDoc);

    if(tempDoc.type[0]==='i' && tempDoc.type[1]==='d'){
      // FAIRE UN FINDINDEX ET SLICE
      setListIDdata(listIDdata.filter((e) => (e._id !== tempDoc._id) ));
      // newListID.filter((e) => (e._id !== tempDoc._id) );
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

  var tempListID=[];
  var tempListJD=[];
  var tempListBS=[];
  var tempListCT=[];
  var tempListAI=[];

  // AU CHANGEMENT D'ETAT DU STORE ON CHARGE 
  // ON PASSE PAR DES TEMPLIST CAR ON A PAS LE TEMPS DE SET L'ETAT QUE LA BOUCLE EST DEJA PASSE AU I SUPERIEUR 
  // useEffect(()=>{
  //   for(let i=0; i<docList.length; i++){
  //     if(docList[i].type[0]==='i' && docList[i].type[1]==='d'){
  //       let index=tempListID.findIndex(doc => doc._id===docList[i]._id);
  //       console.log('index :', index);
  //       if(index===-1){
  //         tempListID.push(docList[i]);
  //       }
  //     } else if(docList[i].type[0]==='j' && docList[i].type[1]==='d'){
  //       let index=tempListJD.findIndex(doc => doc._id===docList[i]._id);
  //       console.log('index :', index);
  //       if(index===-1){
  //         tempListJD.push(docList[i]);
  //       }
  //     } else if(docList[i].type[0]==='b' && docList[i].type[1]==='s'){
  //       let index=tempListBS.findIndex(doc => doc._id===docList[i]._id);
  //       console.log('index :', index);
  //       if(index===-1){
  //         tempListBS.push(docList[i]);
  //       }
  //     } else if(docList[i].type[0]==='c' && docList[i].type[1]==='t'){
  //       let index=tempListCT.findIndex(doc => doc._id===docList[i]._id);
  //       console.log('index :', index);
  //       if(index===-1){
  //         tempListCT.push(docList[i]);
  //       }
  //     } else if(docList[i].type[0]==='a' && docList[i].type[1]==='i'){
  //       let index=tempListAI.findIndex(doc => doc._id===docList[i]._id);
  //       console.log('index :', index);
  //       if(index===-1){
  //         tempListAI.push(docList[i]);
  //       }
  //     }
  //   }
  //   setListIDdata(tempListID);
  //   setListJDdata(tempListJD);
  //   setListBSdata(tempListBS);
  //   setListCTdata(tempListCT);
  //   setListAIdata(tempListAI);
  // }, [docList]);

  let newListID=[];
  let newListJD=[];
  let newListBS=[];
  let newListCT=[];
  let newListAI=[];

  for(let i=0; i<docList.length; i++){
    if(docList[i].type[0]==='i' && docList[i].type[1]==='d'){
      let index=newListID.findIndex(doc => doc._id===docList[i]._id);
      if(index===-1){
        newListID.push(docList[i])
      }
    } else if(docList[i].type[0]==='j' && docList[i].type[1]==='d'){
      let index=newListJD.findIndex(doc => doc._id===docList[i]._id);
      if(index===-1){
        newListJD.push(docList[i])
      }
    } else if(docList[i].type[0]==='b' && docList[i].type[1]==='s'){
      let index=newListBS.findIndex(doc => doc._id===docList[i]._id);
      if(index===-1){
        newListBS.push(docList[i])
      }
    } else if(docList[i].type[0]==='c' && docList[i].type[1]==='t'){
      let index=newListCT.findIndex(doc => doc._id===docList[i]._id);
      if(index===-1){
        newListCT.push(docList[i])
      }
    } else if(docList[i].type[0]==='a' && docList[i].type[1]==='i'){
      let index=newListAI.findIndex(doc => doc._id===docList[i]._id);
      if(index===-1){
        newListAI.push(docList[i])
      }
    }
  }

  // MAP POUR ELEMENTS ID
  // if (newListID.length === 0) {
  //   listID = <Text>Aucun document</Text>
  // }
  let listID= []
  if (newListID.length === 0) {
    var EmptyListID = <Text style={{marginLeft: 20, color:'#8395a7', fontStyle: 'italic'}}>Aucun document</Text>
  }
  listID = newListID.map(function(doc, i){
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
  let listJD= []
  if (newListJD.length === 0) {
    var EmptyListJD = <Text style={{marginLeft: 20, color:'#8395a7', fontStyle: 'italic'}}>Aucun document</Text>
  }
  listJD = newListJD.map(function(doc, i){
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
  let listBS= []
  if (newListBS.length === 0) {
    var EmptyListBS = <Text style={{marginLeft: 20, color:'#8395a7', fontStyle: 'italic'}}>Aucun document</Text>
  }
  listBS = newListBS.map(function(doc, i){
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
  let listCT= []
  if (newListCT.length === 0) {
    var EmptyListCT = <Text style={{marginLeft: 20, color:'#8395a7', fontStyle: 'italic'}}>Aucun document</Text>
  }
  listCT = newListCT.map(function(doc, i){
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
  let listAI= []
  if (newListAI.length === 0) {
    var EmptyListAI = <Text style={{marginLeft: 20, color:'#8395a7', fontStyle: 'italic'}}>Aucun document</Text>
  }
  listAI = newListAI.map(function(doc, i){
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
      {EmptyListID}
      
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
      {EmptyListJD}

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
      {EmptyListBS}

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
      {EmptyListCT}

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
      {EmptyListAI}

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
      <Overlay 
              overlayStyle = {{flexDirection : 'row'}}
              height='auto'
              width='auto'
              isVisible={chargementVisible}>
        {/* <IconRefresh 
            name = 'refresh-cw'
            size = {16}
            style = {{marginTop: 3, marginRight: 6}}/> */}
        <Text style={{textAlign:'center', fontSize:16}}> Chargement</Text>
        <Image source={require('../../assets/Chargement2.gif')} style={{height:20,width:90, marginLeft:-20, marginRight:-20}}/>
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
  return { docList: state.docList, token: state.token }
}


function mapDispatchToProps(dispatch){
  return {
    onCameraClick: function(docType){
      dispatch({type: 'saveDocType', docType});
    },
    getDocumentsOnInit: function(documents){
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
