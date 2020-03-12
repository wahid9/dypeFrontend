import React, {useState,useEffect} from 'react';
import { StyleSheet,  View, ScrollView } from 'react-native';
import {Button, Image, Text, ListItem, Overlay, Card} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconAnt from 'react-native-vector-icons/AntDesign';
import {Calendar, CalendarList, Agenda, LocaleConfig} from 'react-native-calendars';
import IconBurger from '@expo/vector-icons/Feather';
import { DrawerActions } from '@react-navigation/native';
import {connect} from "react-redux";

function AnnonceScreen({navigation,detailAnnonce,reduxFunction}) {
    const [isVisible, setIsVisible] = useState(false);
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [calendarDay, setCalendarDay] = useState('');
    const [confirmation, setConfirmation] = useState(false);
    const [monRdv, setMonRdv] = useState ({});
    const [colorButton, setColorButton] = useState("#125CE0");
    const [annonce, setAnnonce] = useState(detailAnnonce);
    const [image, setImage] = useState(annonce.images[0]);
    const [dispoCeJour, setDispoCeJour] = useState([]);
    
    LocaleConfig.locales['fr'] = {
        monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
        monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
        dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
        dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.'],
        today: 'Aujourd\'hui'
    };
    LocaleConfig.defaultLocale = 'fr';

    var monthName= ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre']

    var jour = calendarDay.day;
    var mois = formatMois(calendarDay.month);
    console.log("mon mois",mois)
    var annee = calendarDay.year;
    
    var sendInfos = ()=>{
        reduxFunction(image,jour,mois)
        setConfirmation(false)
        navigation.navigate('Mes rdv'); 
    }
    function formatMois (mois)  {
        let moisEnLettre = monthName[mois-1]
        return moisEnLettre
    }

    var handleSubmit = (day) => {
        setCalendarVisible(true); setCalendarDay(day); setIsVisible(false); 
    }

    var handleSubmitHour = () => {setMonRdv({date: calendarDay.day +' '+ formatMois(calendarDay.month)+ ' ' + calendarDay.year ,heure: '14:30'})}
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
    // var handleSubmitHour = () => {setMonRdv({date: calendarDay.day +' '+ formatMois(calendarDay.month)+ ' ' + calendarDay.year ,heure: '14:30'})}
   
    let newDispo=[]
    for(let i=0; i<annonce.dispoVisite.length; i++){
        newDispo.push(new Date(annonce.dispoVisite[i]));
    }

    // useEffect(()=>{

    //     console.log('newDispo[0] :', newDispo[0]);
    //     console.log('newDispo[0].getFullYear() :', newDispo[0].getFullYear());
    //     console.log('newDispo[0].getDate() :', newDispo[0].getDate());
    //     console.log('newDispo[0].getMonth() :', newDispo[0].getMonth());
    //     console.log('calendarDay :', calendarDay);
    //     for(let i=0; i<newDispo.length; i++){
    //         if(newDispo[i].getFullYear()==calendarDay.year && newDispo[i].getDate()==calendarDay.day && newDispo[i].getMonth()+1==calendarDay.month){
    //             setDispoCeJour([...dispoCeJour, newDispo[i]]);
    //         }
    //     }
    //     // console.log('object :', object); ICIIIIIIIII

    // },[calendarDay]);


    var listDispo=dispoCeJour.map(function(dispo, i){
        return( <Button 
            title= {dispo}
            titleStyle={{fontSize: 14}}
            buttonStyle= {{backgroundColor: colorButton, height:44, width: 96}}
            containerStyle = {{borderRadius:30}} 
            onPress ={()=> { setMonRdv({date: calendarDay.day +' '+ formatMois(calendarDay.month)+ ' ' + calendarDay.year ,heure: '11:30'}); setColorButton('#74b9ff')}}
            />
        )
    });

    // EXEMPLE : let listID = listIDdata.map(function(doc, i){
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
            height={350}
            width= {330}
            isVisible={calendarVisible}
            onBackdropPress={() => {setCalendarVisible(false)}}>
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
                <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 20}}>
                {listDispo}
                </View>
                <Button 
                    title= 'Valider'
                    buttonStyle= {{backgroundColor: "#fce229", height:30, width: 70}}
                    containerStyle = {{borderRadius:30, flex: 0.9, alignSelf: 'flex-end', justifyContent: 'flex-end'}} 
                    onPress = {() => {setConfirmation(true); setCalendarVisible(false) }}/>

        </Overlay>

        <Overlay style={{flex:1}}
                height={350}
                width= {330}
                isVisible={confirmation}
                onBackdropPress={() => {setConfirmation(false)}}>
                    <View style={{flex:0.8, alignItems:'center'}}>
                        <Image source={require('../../assets/foncia.png')} style={{height: 75, width: 75}} containerStyle={{marginTop:20, marginBottom:30}}/>
                        <Text style={{textAlign:'center', justifyContent:'center'}}>Vous venez de sélectionner un rendez-vous pour {monRdv.date} à {monRdv.heure} avec l'agence Foncia du 11ème</Text>
                    </View>
                    <Button 
                        title= 'Confirmer'
                        buttonStyle= {{backgroundColor: "#fce229", height:40, width: 150}}
                        containerStyle = {{borderRadius:30, alignSelf: 'center', justifyContent: 'flex-end'}} 
                        onPress = {() => { sendInfos()}}
                        />
            </Overlay>

            <ScrollView style={{marginTop: 25}}>
                
        <IconBurger name= {"menu"} style={{marginLeft: 20, marginTop: 20}} color={'#125ce0'} size={35} onPress={() => { navigation.openDrawer()}} />
        <View style={{flexDirection:'row',alignItems:'center',alignSelf:'center'}}>
            <Image source={require('../../assets/Dypebleu.png')}  style={{height:66, width:127, marginBottom:30}}/>
        </View>
       
        <Card image={{ uri: annonce.images[0] }} imageStyle= {{height:250}} >
            <Text style={{marginBottom:5, fontSize:22}} >{annonce.typeDeBien} à louer, {annonce.ville} {annonce.codePostal}, {annonce.nbPiece} pièces / {annonce.surface} m² {annonce.prix} €/mois</Text>
            <View style={{height:2, width:360, backgroundColor:"#D1CCCC",marginTop:10}}></View>
            <Text style={{marginTop:10, marginBottom:15,fontSize:20}}>Description :</Text>
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
                onPress={()=> setIsVisible(true) }
                title="Prendre un rendez-vous"
                buttonStyle= {{backgroundColor: "#125CE0"}}
                containerStyle={{height: 35, marginBottom: 10}}/>
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
    return { detailAnnonce: state.annonce }
  }

function mapDispatchToProps(dispatch) {
    return {
      reduxFunction: function(picture,day,month) { 
        dispatch({type:'confirmerRdv', image: picture, jour : day, mois : month}) 
      }}
}
  export default connect (mapStateToProps,mapDispatchToProps)(AnnonceScreen);