import React, {useEffect,useState} from 'react';
import {Card, Text,Icon,Button} from 'react-native-elements';
import { StyleSheet, View,Image,ScrollView,TouchableOpacity,AsyncStorage, ClippingRectangle} from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconBurger from '@expo/vector-icons/Feather';
import { connect } from 'react-redux';
import { add } from 'react-native-reanimated';
 
function MesMatchScreens({navigation,theToken,reduxFunction}) {
  
  
  const [annonce, setAnnonce] = useState([]);

   var addLike = async (data)=>{
    console.log(data)
    var envoiAnnonce = await fetch('http://10.2.5.189:3000/addLike',{
       method: 'POST',
       headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `token=${theToken}&idAnnonceLiked=${data._id}`
     })
  }
  
  
var RecupDataAnnonce = (i) => {
  reduxFunction(annonce[i]);
  navigation.navigate('Annonces')
}

useEffect(() => {
    fetchData();
  }, []);

  var  fetchData= async ()=> {
    var data =  await fetch("http://10.2.5.209:3000/mesMatchs");
    var response = await data.json();
    setAnnonce(response.annonces)
    // console.log(response.annonces)
  
  }
    var lesAnnonces = annonce.map((data, i ) =>{
      return( <TouchableOpacity key={i} onPress = {()=> RecupDataAnnonce(i)}>
      <Card image={{ uri: data.images[0] }} imageStyle= {{height:250}}>
          <Text style={{marginBottom:5, fontSize: 22}}>{data.ville} ({data.codePostal})</Text>
          <Text style={{marginBottom:5, fontSize:18}}>{data.typeDeBien}</Text>
          <Text style={{marginBottom:5}}>{data.nbPiece} pièces/ {data.surface} m²</Text>
          <Text h4 style={{marginBottom:5}}>{data.prix}€/mois</Text> 
          <Image source={{ uri: data.image }}/>
          <IconFontAwesome onPress = {()=>addLike(data)} style={{alignSelf: 'flex-end', marginRight:5}}
              name="heart"
              size={25}
              color="black"
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
        <Text h4 style={{textAlign: 'center'}}>Mes matchs</Text>
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
  return { theToken: state.token }
}

function mapDispatchToProps(dispatch) {
  return {
    reduxFunction: function(tabDataAnnonce) { 
      dispatch({type:'seeAnnonce', annonce: tabDataAnnonce}) 
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MesMatchScreens);
