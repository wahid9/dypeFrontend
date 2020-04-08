import React,{useState,useEffect} from 'react';
import { StyleSheet, View,Image,ScrollView, Alert, AsyncStorage,TouchableOpacity} from 'react-native';
import {Card, Badge, Text,Button} from 'react-native-elements';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { Overlay } from 'react-native-elements';
import IconBurger from '@expo/vector-icons/Feather';
import { connect } from 'react-redux';

function FavorisScreen({navigation,favorisList,token,deleteOnClick,printAnnonce}) {
 

const deleteFav = async (data) =>{
  var rawResponse = await fetch(`http://192.168.1.24:3000/deleteFav/${data._id}/${token}`,{
  method : 'DELETE'
  })
  deleteOnClick(data)
}

var recupAnnonce =(data)=>{
printAnnonce(data)
navigation.navigate('Annonces')
}

  const [isVisible, setIsVisible] = useState(false);
  var lesAnnonces = favorisList.map((data, i ) =>{
    return( <TouchableOpacity key={i} onPress = {()=>recupAnnonce(data)}>
    <Card image={{ uri: data.images[0].url }} imageStyle= {{height:250}}>
        <Text style={{marginBottom:5, fontSize: 22}}>{data.ville} ({data.codePostal})</Text>
        <Text style={{marginBottom:5, fontSize:18}}>{data.typeDeBien}</Text>
        <Text style={{marginBottom:5}}>{data.nbPiece} pièces/ {data.surface} m²</Text>
        <Text h4 style={{marginBottom:5}}>{data.prix}€/mois</Text> 
        <Image source={{ uri: data.image }}/>
        <IconFontAwesome 
         style={{alignSelf: 'flex-end', marginRight:5}}
                name="trash"
                size={25}
                color="black"
                onPress = {()=> {
                  Alert.alert(
                  'Etes-vous sûr(e) de vouloir supprimer cette annonce de vos favoris ? ',
                  '',
                  [

                    {
                      text: 'NON',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {text: 'OUI', onPress: ()=>{deleteFav(data),console.log('hello')}},
                  ],
                  {cancelable: false},

                );}}
              


            />
    </Card>
    </TouchableOpacity>
)}
)
  
  return (
    <ScrollView style={{marginTop: 25}}>
   <IconBurger name= {"menu"} style={{marginLeft: 20, marginTop: 20}} color={'#125ce0'} size={35} onPress={() => navigation.openDrawer()} />
      <View style={{flexDirection:'row',alignItems:'center',alignSelf:'center'}}>
      <Image source={require('../../assets/Dypebleu.png')}  style={{height:66, width:127, marginBottom:30,}}/>
      </View>
    <Text h4 style={{textAlign: 'center'}}>MES FAVORIS</Text>
    {lesAnnonces}
</ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function mapStateToProps(state){
  
  return { favorisList: state.favlist, token:state.token }
}

function mapDispatchToProps(dispatch){
  return{
    deleteOnClick: function(fav){
      dispatch({type: 'deleteFav',fav})
    },
    printAnnonce: function(fav){
      dispatch({type: 'AnnonceFav',fav})
    },
  }
}

export default connect(mapStateToProps,mapDispatchToProps) (FavorisScreen);
