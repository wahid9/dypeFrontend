import React, {useEffect,useState} from 'react';
import {Card, Text,Icon,Button} from 'react-native-elements';
import { StyleSheet, View,Image,ScrollView,TouchableOpacity } from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconBurger from '@expo/vector-icons/Feather';
 
function MesMatchScreens({navigation}) {
  const [like, setLike] = useState(false);
  const [annonce, setAnnonce] = useState([]);

    var colorLike;
    var AnnonceLiked = () =>{
      setLike(!like)
    }
    if(like){
      colorLike = "red"
    }
  
  useEffect(() => {
    fetchData();
  }, []);
  
  var  fetchData= async ()=> {
    var data =  await fetch("http://10.2.5.232:3000/RecoverAnnonce");
    var response = await data.json();
    setAnnonce(response.rep) 
  }
  
  var lesAnnonces = annonce.map( ( data, i ) =>{
      return( 
      <TouchableOpacity key = {i} onPress = {()=> navigation.navigate('Annonces')}>
        <Card image={{ uri: data.image }} imageStyle= {{height:250}}>
            <Text style={{marginBottom:5, fontSize:25}}>{data.localisation}</Text>
            <Text style={{marginBottom:5, fontSize:20}}>{data.typeDeBien}</Text>
            <Text style={{marginBottom:5}}>{data.descriptionBref}</Text>
            <Text style={{marginBottom:5}}>{data.nbPiece} / {data.surface}</Text>
            <Text h4 style={{marginBottom:5}}>{data.prix}</Text> 
            <Image source={{ uri: data.image }}/>
            <IconFontAwesome style={{alignSelf: 'flex-end', marginRight:5}}
                name="heart"
                size={25}
                color={colorLike}
            />
        </Card>
      </TouchableOpacity>)
  })
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
export default MesMatchScreens;