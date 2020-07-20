import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import {Button, Overlay, Image} from 'react-native-elements';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { Camera } from 'expo-camera';
import { connect } from 'react-redux';

// BESOIN DE GERER LE UNMOUNT DU COMPOSANT CAMERA?? CA MARCHE BIEN CHEZ MOI

function SnapScreen(props) {
  
  const [hasPermission, setHasPermission] = useState(null);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [chargementVisible, setChargementVisible] = useState(false)

  var camera = useRef(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [photoUri, setPhotoUri] = useState ();

  // DEMANDE DE PERMISSION ACCES A L'APPAREIL PHOTO DU TELEPHONE

  useEffect(() => { 
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // APPAREIL PHOTO

  var cameraDisplay
   if(hasPermission) {
    cameraDisplay = <Camera style={{ flex: 1 }} 
    type={Camera.Constants.Type.back}
    flashMode={flash}
    ref={ref => (camera = ref)}
    >
      <View    
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          flexDirection: 'row',
        }}>
  
        <TouchableOpacity
          style={{
         
            alignSelf: 'flex-end',
            alignItems: 'center',
          }}
          onPress={() => {
            setFlash(
              flash === Camera.Constants.FlashMode.torch
                ? Camera.Constants.FlashMode.off
                : Camera.Constants.FlashMode.torch
            );
          }}>
           <IconFontAwesome
                name="flash"
                size={20}
                color="#ffffff"
            /><Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flash </Text>
        </TouchableOpacity>
      </View>
    </Camera>
   } else {
    cameraDisplay = <View style={{ flex: 1 }}></View>
   }

  return (
    <View style={{flex:1}}>

          <Overlay isVisible={previewVisible} width= '80%' height='70%'>
            <View>
              <Image 
                source={{uri: photoUri}}
                style={{width: '100%', height: '90%', marginBottom: 0, paddingBottom: 0}}
              />
              <Button
                title="Prendre à nouveau"
                buttonStyle={{backgroundColor: '#125ce0', width: '90%', height: 40}}
                containerStyle={{ marginTop: -35, marginBottom: 5, marginLeft: 10, flexDirection:'row', justifyContent:'center'}}
                titleStyle={{color: 'white', fontSize: 14}}
                onPress={()=>setPreviewVisible(false)}
              />
              <Button
                title="Valider cette photo"
                buttonStyle={{backgroundColor: '#125ce0', width: '90%', height: 40}}
                containerStyle={{ flexDirection:'row', justifyContent:'center', marginLeft: 10}}
                titleStyle={{color: 'white', fontSize: 14}}
                onPress={async()=>{
                  setPreviewVisible(false);
                  setChargementVisible(true);
                  var data = new FormData();
                    data.append('photo', {
                      uri: photoUri,
                      type: 'image/jpeg',
                      name: 'photo.jpg'
                    });
<<<<<<< HEAD
                    data.append('token', props.token)
                    console.log('DATA', data)
                    var rawResponse = await fetch("http://192.168.0.25/uploadfromcamera", {
=======
                    data.append('docType', props.docType);    
                    data.append('token', props.token);
                    console.log('DATA', data);
                    var rawResponse = await fetch("http://192.168.1.82:3000/uploadfromcamera", {
>>>>>>> 722ee9abb18983454861877723ad3740d33c0430
                      method: 'POST',
                      body: data
                    });
                    var response = await rawResponse.json();

                    props.addDocument(response.docUploaded);

                  setChargementVisible(false)
                  props.navigation.navigate('Mes documents');
                }}
              />
            </View>
          </Overlay>

        {cameraDisplay}
    
        <Button
            onPress={async () => {

              if (camera) {

                let photo = await camera.takePictureAsync({quality : 0.7});    // POSSIBILITE D'OPTIMISATION DE LA GESTION QUALITE
                setPhotoUri(photo.uri);

                setPreviewVisible(true);
                  
              }
            }}
            icon={
              <SimpleLineIcons
              name='camera'
              size={30}
              style={{color: 'white'}}
            />
            }
            title="Prendre la photo"
            titleStyle={{marginLeft: 10}}
            buttonStyle={{backgroundColor: "#125ce0", borderRadius: 0}}
            type="solid"
        />
   
   <Overlay 
      overlayStyle = {{flexDirection : 'row'}}
      height='auto'
      width='auto'
      isVisible={chargementVisible}
    >
      <View style={{width: 'auto', flexDirection : 'row'}}>
        <Text style={{textAlign:'center', fontSize:16}}> Chargement</Text>
        <Image source={require('../../assets/Chargement2.gif')} style={{height:20,width:90, marginLeft:-20, marginRight:-20}}/>
      </View>
    </Overlay>

</View>

);
}

function mapStateToProps(state){
  return { docType: state.docType, token: state.token }
};

function mapDispatchToProps(dispatch){
  return {
    addDocument: function(document){
      dispatch({type: 'addDocument', document});
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SnapScreen);