import React, {useEffect,useState} from 'react';
import {Card, Text,Icon,Button} from 'react-native-elements';
import { Platform,StyleSheet, View,Image,ScrollView,TouchableOpacity,AsyncStorage, ClippingRectangle} from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconBurger from '@expo/vector-icons/Feather';
import {LinearGradient} from 'expo-linear-gradient'
import { connect } from 'react-redux';
import { add } from 'react-native-reanimated';
 
function MesMatchScreens({navigation,theToken,reduxFunction,addFavStore,majFavStore,theFavList,onSubmitToken}) {
  
  
  const [annonce, setAnnonce] = useState([]);
  const [token,setToken] = useState();

  // var sendFavoris = (i)=>{
  //   setTabLiked([...tabLiked,annonce[i]])
  //   AsyncStorage.setItem("likedAnnonces",JSON.stringify(tabLiked))
  // }
  
   var addLike = async (data)=>{
    var envoiAnnonce = await fetch('http://192.168.43.201:3000/addLike',{
       method: 'POST',
       headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `token=${theToken}&idAnnonceLiked=${data._id}`
    })
    addFavStore(data)
  }
  

  
var RecupDataAnnonce = (i) => {
  reduxFunction(annonce[i]);
  navigation.navigate('Annonces')
}

useEffect(() => {
  // RECUP DU TOKEN DANS LE TEL POUR LE METTRE DANS LE STORE REDUX
  // AsyncStorage.getItem('token',(err,value)=>{
  //   setToken(value);
  // })
  // if(token){
  //   onSubmitToken(token)
  // }


  var recupBdd = async() =>{
    var sendToken  = await fetch('http://192.168.43.201:3000/saveToStore',{
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
     body:`token=${theToken}`
    })
  var annonceBdd = await sendToken.json();
  majFavStore(annonceBdd)
  }
  
  fetchData();
  recupBdd();
}, []);

  console.log("crit",token)
  
  var  fetchData= async ()=> {
    var rawResponse =  await fetch("http://192.168.43.201:3000/mesMatchs",{
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `token=${theToken}`
    })
    var response = await rawResponse.json();
    setAnnonce(response.annonces)
    console.log("ici")
  }
  // APPEL EN BDD SI LE USER EST DEJA CO OU PAS 
  // if(!token){
  //   var  fetchData= async ()=> {
  //     var rawResponse =  await fetch("http://192.168.0.21:3000/mesMatchs",{
  //       method: 'POST',
  //       headers: {'Content-Type':'application/x-www-form-urlencoded'},
  //       body: `token=${theToken}`
  //     })
  //     var response = await rawResponse.json();
  //     setAnnonce(response.annonces)
  //     console.log("ici")
  //   }
  // }else{
  //   var  fetchData= async ()=> {
  //     var rawResponse =  await fetch("http://192.168.0.21:3000/mesMatchs",{
  //       method: 'POST',
  //       headers: {'Content-Type':'application/x-www-form-urlencoded'},
  //       body: `token=${token}`
  //     })
  //     var response = await rawResponse.json();
  //     setAnnonce(response.annonces)
  //     console.log("la")
  //   }
  // }

    var lesAnnonces = annonce.map((data, i ) =>{

      var pictocolor ='black';
      for(var j = 0; j <theFavList.length; j++){
        if(theFavList[j]._id === data._id){
            pictocolor = 'red'   
        }
      }
      return( /* <View>
        <Card   image={{ uri: data.images[0].url}} imageStyle= {{height:200}} containerStyle={{borderBottomRightRadius:30, marginRight:'5%',marginLeft:'5%',marginBottom:'5%',elevation:10,borderWidth:0,marginTop:'30%'}}>
            <View style={{flexDirection:'row'}}>
              <View>
                <Text style={{marginBottom:5, fontSize:22}}>{data.typeDeBien} à louer</Text>
                <Text style={{marginBottom:5, fontSize: 20}}>{data.ville} ({data.codePostal})</Text>
              </View>
              <Text style={{marginLeft:'30%',marginTop:'1%',color:'#AEAEAE'}}>{data.nbPiece} pièces/ {data.surface} m²</Text>
            </View>
                <View style={{flexDirection:'row',height:70,justifyContent:'space-between'}}>
                  <View>
                  <Text h4 style={{marginTop:'30%'}}>{data.prix}€/mois</Text> 
                  </View>
                  <View style={{width:'65%',justifyContent:'flex-end',marginLeft:'55%'}}>
                  <IconFontAwesome onPress = {()=>{addLike(data)}} style={{}}
                  name="heart"
                  size={25}
                  color= {pictocolor}
                />
                  </View>
                <Image source={{ uri: data.image }}/>
                
            </View>
            
          </Card>
        </View> */
        <TouchableOpacity activeOpacity={0.9}  key={i} onPress = {()=> RecupDataAnnonce(i)}>
      <View style={{backgroundColor:'#125ce0',marginLeft:20,marginRight:20,borderTopLeftRadius:10,marginTop:10}}>
      <Image source={{uri: data.images[0].url}}  style={{height:300, width:'100%',borderTopLeftRadius:100,marginBottom:-15}}/>
      </View>
      <Card containerStyle={styles.Shadow}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <View>
                <Text style={{marginBottom:5, fontSize:22}}>{data.typeDeBien} </Text>
                <Text style={{marginBottom:5, fontSize: 20}}>{data.ville} ({data.codePostal})</Text>
              </View>
              <View>
                <Text style={styles.nbPiece}>{data.nbPiece} pièces/ {data.surface} m²</Text>
              </View>
            </View>
                <View style={{flexDirection:'row',height:70,justifyContent:'space-between',alignItems:'flex-end'}}>
                  <View>
                  <Text h4 style={{marginTop:35}}>{data.prix}€/mois</Text> 
                  </View>
                  <View style={styles.pictoCoeur}>
                  <IconFontAwesome onPress = {()=>{addLike(data)}}
                  name="heart"
                  size={22}
                  color= {pictocolor}
                  
                />
                  </View>     
            </View> 
          </Card>
        </TouchableOpacity>
  )}
  )
  
  return (
    
    <View style={{backgroundColor:'white'}}>
      <View  style={{marginTop:'12%'}}>
      <View style={{flexDirection:'row',justifyContent:'space-around',marginBottom:'5%'}}>
      <IconBurger name= {"menu"} style={{marginTop:'4%',marginLeft:'-5%'}} color={'#125ce0'} size={35} onPress={() => navigation.openDrawer()} />
      <Image source={require('../../assets/Dypebleu.png')}  style={{height:66, width:127}}/>
      <IconFontAwesome style={{marginTop:'4%',marginRight:'-5%'}}
              name='user'
              size={30}
              color= '#125ce0'
            />
      </View>
      </View>
      <ScrollView style={{marginBottom:'16%'}}>

      {/* <TouchableOpacity>
      <View style={{backgroundColor:'#125ce0',width:369,marginLeft:20,borderTopLeftRadius:10}}>
      <Image source={require('../../assets/livingRoom.jpg')}  style={{height:300, width:369,borderTopLeftRadius:100,marginBottom:-15}}/>
      </View>
      <Card containerStyle={{width:369,borderBottomRightRadius:30,marginLeft:20,elevation:10,borderWidth:0}}>
            <View style={{flexDirection:'row'}}>
              <View>
                <Text style={{marginBottom:5, fontSize:22}}> à louer</Text>
                <Text style={{marginBottom:5, fontSize: 20}}> ()</Text>
              </View>
              <Text style={{marginLeft:'30%',marginTop:'1%',color:'#AEAEAE'}}> pièces/  m²</Text>
            </View>
                <View style={{flexDirection:'row',height:70,justifyContent:'space-between'}}>
                  <View>
                  <Text h4 style={{marginTop:35}}>€/mois</Text> 
                  </View>
                  <View style={{width:80, marginTop:30,alignItems:'flex-end',justifyContent:'flex-end'}}>
                  <IconFontAwesome onPress = {()=>console.log('heelo')}
                  name="heart"
                  size={28}
                  color= 'red'
                />
                  </View>     
            </View> 
          </Card>
        </TouchableOpacity> */}
        {lesAnnonces}
    </ScrollView>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Shadow:{
    ...Platform.select({
      ios:{
          shadowColor: "#000",
          marginRight:20,
          marginLeft:20,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          
        borderBottomRightRadius:30,
        marginLeft:20,
        elevation:10,
        borderWidth:0,
         marginBottom:30,
      },
      android:{
        elevation:5,
        marginRight:20,
        marginLeft:20,
        borderBottomRightRadius:30,
        marginLeft:20,
        elevation:10,
        borderWidth:0,
         marginBottom:30,
      }
    })
  },
  pictoCoeur:{
    ...Platform.select({
      ios:{backgroundColor:'white',
      borderRadius:24,
      width:35,
      height:35,
      justifyContent:'center',
      alignItems:'center',
      paddingTop:3,
      shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 2,
  },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
      android:{backgroundColor:'white',elevation:5,borderRadius:24,width:35,height:35,justifyContent:'center',alignItems:'center',paddingTop:3}
    })

  },
  nbPiece:{
    ...Platform.select({
      ios:{marginTop:5,color:'#AEAEAE'},
      android:{marginTop:5,color:'#AEAEAE'},
    })
  }
});


function mapStateToProps(state){
  console.log(state.favlist)
  return { theToken: state.token, theFavList : state.favlist }
}

function mapDispatchToProps(dispatch) {
  return {
    reduxFunction: function(tabDataAnnonce) { 
      dispatch({type:'seeAnnonce', annonce: tabDataAnnonce}) 
    },
    addFavStore: function(annonceLiked) { 
      dispatch({type:'annonceLiked',annonceLiked}) 
    },
    majFavStore: function(annonceLikedBdd) { 
      dispatch({type:'annonceAddfromBdd',annonceLikedBdd}) 
    },
    onSubmitToken : function(token){
      dispatch({type : 'tokenExist', token })
    },
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MesMatchScreens);
