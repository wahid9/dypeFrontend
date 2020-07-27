import React, {useState,useEffect} from 'react';
import { StyleSheet,  View, ScrollView, Alert } from 'react-native';
import {Button, Image, Text, ListItem, Overlay, Card} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconAnt from 'react-native-vector-icons/AntDesign';
import {Calendar, CalendarList, Agenda, LocaleConfig} from 'react-native-calendars';
import IconBurger from '@expo/vector-icons/Feather';
import { DrawerActions } from '@react-navigation/native';
import {connect} from "react-redux";

function AnnonceScreen({navigation, detailAnnonce, token,reduxFunction, validDossier}) {

    const [isVisible, setIsVisible] = useState(false);
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [calendarDay, setCalendarDay] = useState('');
    const [confirmation, setConfirmation] = useState(false);
    const [colorButton, setColorButton] = useState("#125CE0");
    
    const [annonce, setAnnonce] = useState(detailAnnonce); // REFAIRE A L'OCCASE EN MAPPANT DIRECTEMENT SUR LE STORE
    const [dispoCeJour, setDispoCeJour] = useState([]);
    const [monRdv, setMonRdv] = useState (new Date);
    const [image, setImage] = useState(annonce.images[0].url);

    // var images = annonce.images.map((data, i ) =>{
    //      return(  <Image source = {{uri: data[i]}} style={{height:250, width:370,marginRight:3}}/>)
    // })
    // console.log('IMAGE', images)
    
    LocaleConfig.locales['fr'] = {
        monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
        monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
        dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
        dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.'],
        today: 'Aujourd\'hui'
    };
    LocaleConfig.defaultLocale = 'fr';

    var monthName= ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre']

    function formatMois (mois)  {
        let moisEnLettre = monthName[mois-1]
        return moisEnLettre
    }

    function getHour(date){
        let hour;
        if(date.getMinutes()!=0){
            hour=date.getHours()-1+":"+date.getMinutes()
        } else {
            hour=date.getHours()-1+":"+date.getMinutes()+"0"
        }
        return hour;
    }

    useEffect(()=>{
        console.log('::::::::=======', annonce);

    var loadData = async () =>{
        var rawData = await fetch(`http://172.20.10.4:3000/recupDispo`,{
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: `annonce=${JSON.stringify(annonce)}`
        }
        );
        // var data = await rawData.json();
        // console.log('ddddddddaaaaaaaaaaaaaaattttttttttttaaaaaaaaaaa', data);
    }
    loadData()
},[])

    var handleSubmit = (day) => {
        setCalendarDay(day); 
        setIsVisible(false); 
        setCalendarVisible(true); 
    }

   var parking;
   var interphone;
   var terrasse;
   var ascenseur;
   var balcon;
   var cave;
   var digicode;

   if(annonce.parking == true){
    parking = <Text style={{marginBottom:2, fontSize:17}}>Parking</Text>
   }
    if(annonce.interphone == true){
       interphone = <Text style={{marginBottom:2, fontSize:17}}>Interphone</Text>
   }
   if(annonce.terrasse == true){
    terrasse = <Text style={{marginBottom:2, fontSize:17}}>Terrasse</Text>
   }
   if(annonce.cave == true){
       cave = <Text style={{marginBottom:2, fontSize:17}}>Cave</Text>
   }
   if(annonce.balcon == true){
        balcon =  <Text style={{marginBottom:2, fontSize:17}}>Balcon</Text>
   }
   if(annonce.ascenseur == true){
    ascenseur =  <Text style={{marginBottom:2, fontSize:17}}>ascenseur</Text>
   }
   if(annonce.digicode == true){
    digicode = <Text style={{marginBottom:2, fontSize:17}}>digicode</Text>
   }
   
    let newDispo=[]
    for(let i=0; i<annonce.dispoVisite.length; i++){
        newDispo.push(new Date(annonce.dispoVisite[i]));
    }

    useEffect(()=>{

        let tempDispoCeJour=[]

        for(let i=0; i<newDispo.length; i++){
            if(newDispo[i].getFullYear()==calendarDay.year && newDispo[i].getDate()==calendarDay.day && newDispo[i].getMonth()+1==calendarDay.month){
                let index=tempDispoCeJour.findIndex(dispo => dispo === newDispo[i]);
                tempDispoCeJour.push(newDispo[i]);
            }
        }
        setDispoCeJour(tempDispoCeJour);

    },[calendarDay]);
    


    var listDispo=dispoCeJour.map(function(dispo, i){

        var color = "#C0CFEC";
        ///for (var j = 0; j < dispoCeJour.length;i++){
            if(monRdv=== dispo){
                color =  "#125CE0"
            }
        //}

        return( <Button 
            key={i}
            title= {getHour(dispo)}
            titleStyle={{fontSize: 14}}
            buttonStyle= {{backgroundColor: color, height:44, width: 96}}
            containerStyle = {{borderRadius:30, marginLeft: 5, marginRight: 5}} 
            onPress ={()=> {setMonRdv(dispo)}}
            />
        )
    });

    // §§ ENREGISTRE LE RDV DANS LA BDD - OK COTE FRONT MAIS PAS ENCORE COTE BACK §§

    // const saveRDV = async (rdv) => {
    //     console.log('rdv :', rdv);
    //     await fetch('http://10.2.5.181:3000/saveRdv', {
    //         method: 'POST',
    //         headers: {'Content-Type':'application/x-www-form-urlencoded'},
    //         body: `date=${rdv}&agence=FONCIA&token=${token}&annonce=${annonce._id}`
    //     })
    // }
    return (
    <View style={{flex: 1}}>
        <Overlay 
            height={350}
            width= {330}
            isVisible={isVisible}
            onBackdropPress={() => {setIsVisible(false)}}>
            <Calendar
            current = {Date}
            minDate = {Date}
            onDayPress={(day) => handleSubmit(day)}/>
        </Overlay>
        <Overlay 
            height='auto'
            width= '90%'
            isVisible={calendarVisible}
            onBackdropPress={() => {setCalendarVisible(false)}}>
            <View style={{justifyContent: "space-around"}}>
            <IconAnt 
                name = 'arrowleft' 
                size={20} 
                onPress={()=>{setIsVisible(true); setCalendarVisible(false)}}/>
                <ListItem 
                    title ={calendarDay.day +' '+ formatMois(calendarDay.month)+ ' ' + calendarDay.year}
                    titleStyle={{fontSize: 18, fontWeight:'700', textAlign:'center'}}
                    containerStyle={{paddingTop:0}}
                    bottomDivider 
                />  
                <Text style={{textAlign: 'center', fontSize: 16, marginTop: 15}}>Choisissez un rdv parmi les disponibilités suivantes:</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, height: 200}}>
                {listDispo}
                </View>
                <Button
                    title= 'Valider'
                    buttonStyle= {{backgroundColor: "#fce229", height:35, width: 80}}
                    containerStyle = {{borderRadius:30,marginBottom:50, marginRight:10, flex: 0.9, alignSelf: 'flex-end', justifyContent: 'flex-end'}} 
                    onPress = {() => {setConfirmation(true); setCalendarVisible(false) }}
                />
            </View>
        </Overlay>

        <Overlay style={{flex:1}}
                height={300}
                width= {330}
                isVisible={confirmation}
                onBackdropPress={() => {setConfirmation(false)}}
        >
            <View style={{flex:1, alignItems:'center'}}>
                <View style={{flex:0.8, alignItems:'center'}}>
                    <Image source={require('../../assets/foncia.png')} style={{height: 75, width: 75}} containerStyle={{marginTop:20, marginBottom:30}}/>
                    <Text style={{textAlign:'center', justifyContent:'center'}}>Vous venez de sélectionner un rendez-vous pour le {monRdv.getDate()+'/'+(monRdv.getMonth()+1)+'/'+monRdv.getFullYear()} à {getHour(monRdv)} avec l'agence Foncia Paris Est</Text>
                </View>
                <Button 
                    title= 'Confirmer'
                    buttonStyle= {{backgroundColor: "#fce229", height:40, width: 150}}
                    containerStyle = {{borderRadius:30, justifyContent: 'flex-end'}} 
                    onPress = {() => { console.log('monRdv :', monRdv); setConfirmation(false); reduxFunction(image,monRdv); navigation.navigate('Mes rdv') }} // saveRDV(monRdv)
                />
            </View>
        </Overlay>


        <ScrollView style={{marginTop: 25}}>
                
            <IconBurger name= {"menu"} style={{marginLeft: 20, marginTop: 20}} color={'#125ce0'} size={35} onPress={() => { navigation.openDrawer()}} />
            <View style={{flexDirection:'row',alignItems:'center',alignSelf:'center'}}>
                <Image source={require('../../assets/Dypebleu.png')}  style={{height:66, width:127, marginBottom:30}}/>
            </View>
        
            <Card image={{ uri: annonce.images[0].url }} imageStyle= {{height:250}} >
            {/* <Card>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <Image source = {{uri: annonce.images[0]}} style={{height:250, width:370,marginRight:3}}/>
                <Image source = {{uri: annonce.images[1]}} style={{height:250, width:370,marginRight:3}}/>
                <Image source = {{uri: annonce.images[2]}} style={{height:250, width:370,marginRight:3}}/>
                <Image source = {{uri: annonce.images[3]}} style={{height:250, width:370,marginRight:3}}/>
                </ScrollView> */}
                <Text style={{marginBottom:5,marginTop:10,fontSize:22}} >{annonce.typeDeBien} à louer, {annonce.ville} {annonce.codePostal}, {annonce.nbPiece} pièces / {annonce.surface} m² {annonce.prix} €/mois</Text>
                <View style={{height:2, width:360, backgroundColor:"#D1CCCC",marginTop:10}}></View>
                <Text style={{marginTop:10, marginBottom:15,fontSize:20}}>Description :</Text>
                <Text style={{marginTop:10, marginBottom:15,fontSize:15}}> Paris XII - SQUARE COURTELINE - 3 PIÈCES DE 73 M² - 2 CH - Dans un immeuble de standing, sécurisé par digicode et interphone. Nous vous proposons cet appartement de 3 pièces de 73 m² carrez, au 2ème ETAGE. Cet appartement se compose d'une entrée avec un très, d'une belle pièce de séjour, d'une cuisine (non équipée et non aménagée) et d'un WC indépendant, de deux chambres et une salle de bains. Chauffage et eau chaude individuelle électrique. Loyer HC: 1839,60; Provisions sur charges: 200euros, parking: 124,11euros soit un loyer CC de 2163,71euros/Mois. </Text>
                <Text style={{marginBottom:2, fontSize:17}}>Surface de {annonce.surface} m²</Text>
                <Text style={{marginBottom:2, fontSize:17}}>{annonce.nbPiece} Pièces</Text>
                <Text style={{marginBottom:2, fontSize:17}}>{annonce.chambre} Chambre(s)</Text>
                <View style={{height:2, width:360, backgroundColor:"#D1CCCC",marginTop:10}}></View>
                <Text style={{marginTop:10, marginBottom:15,fontSize:20}}>L'appartement :</Text>
                <Text style={{marginBottom:2, fontSize:17}}>{annonce.toilette} Toilette </Text>
                <Text style={{marginBottom:2, fontSize:17}}>Chauffage {annonce.chauffage}</Text>
                {parking}
                {interphone}
                {terrasse}
                {cave}
                {balcon}
                {ascenseur}
                {digicode}
                <View style={{height:2, width:360,marginTop:10}}></View>
            </Card>
        </ScrollView>

        <Button
            icon={
                <Icon
                    name="calendar-o"
                    size={20}
                    color="#ffffff"
                    style= {{marginRight : 5}}/>
                }
                    onPress={()=> {!validDossier ? Alert.alert("Votre dossier est incomplet. Merci de renseigner vos documents afin de prendre un RDV.") : setIsVisible(true)}}
                    title="Prendre un rendez-vous"
                    buttonStyle= {{backgroundColor: "#125CE0"}}
                    containerStyle={{height: 35, marginBottom: 10}}
                />
            {/* onPress={()=> {
                        if(!validDossier){
                            Alert.alert("Votre dossier est incomplet. Merci de renseigner vos documents afin de prendre un RDV.")
                        } else {
                            setIsVisible(true)
                        }
            }}
            title="Prendre un rendez-vous"
            buttonStyle= {{backgroundColor: "#125CE0"}}
            containerStyle={{height: 35, marginBottom: 10}}
        /> */}
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
});

function mapStateToProps(state) {
    return { detailAnnonce: state.annonce, token: state.token, validDossier: state.validDossier }
  }

function mapDispatchToProps(dispatch) {
    return {
      reduxFunction: function(picture,monRdv) { 
        dispatch({type:'confirmerRdv', image: picture, date : monRdv}) 
      }}
}
  export default connect (mapStateToProps,mapDispatchToProps)(AnnonceScreen);