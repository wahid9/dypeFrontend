import React, {useState,useEffect} from 'react';
import { StyleSheet,  View, ScrollView } from 'react-native';
import {Button, Image, Text, ListItem, Overlay, Card} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconAnt from 'react-native-vector-icons/AntDesign';
import {Calendar, CalendarList, Agenda, LocaleConfig} from 'react-native-calendars';
import IconBurger from '@expo/vector-icons/Feather';
import { DrawerActions } from '@react-navigation/native';
import {connect} from "react-redux";

function AnnonceScreen({navigation,detailAnnonce}) {

    const [isVisible, setIsVisible] = useState(false);
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [calendarDay, setCalendarDay] = useState('');
    const [confirmation, setConfirmation] = useState(false);
    const [monRdv, setMonRdv] = useState ({});
    const [colorButton, setColorButton] = useState("#125CE0");
    const [annonce, setAnnonce] = useState(detailAnnonce);

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

    var handleSubmit = (day) => {
        setCalendarVisible(true); setCalendarDay(day); setIsVisible(false); 
    }

    var handleSubmitHour = () => {setMonRdv({date: calendarDay.day +' '+ formatMois(calendarDay.month)+ ' ' + calendarDay.year ,heure: '14:30'})}
    console.log(annonce)
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
                    bottomDivider />  
                <Text style={{textAlign: 'center', fontSize: 16, marginTop: 15}}>Choisissez un rdv parmi les disponibilités suivantes:</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 20}}>
                    <Button 
                        title= '11:30'
                        titleStyle={{fontSize: 14}}
                        buttonStyle= {{backgroundColor: colorButton, height:44, width: 96}}
                        containerStyle = {{borderRadius:30}} 
                        onPress ={()=> { setMonRdv({date: calendarDay.day +' '+ formatMois(calendarDay.month)+ ' ' + calendarDay.year ,heure: '11:30'}); setColorButton('#74b9ff')}}
                        />
                    <Button 
                        title= '14:30'
                        titleStyle={{fontSize: 14}}
                        buttonStyle= {{backgroundColor: "#125CE0", height:44, width: 96}}
                        containerStyle = {{borderRadius:30}}
                        onPress ={()=> handleSubmitHour() }  />
                    <Button 
                        title= '17:00'
                        titleStyle={{fontSize: 14}}
                        buttonStyle= {{backgroundColor: "#125CE0", height:44, width: 96}}
                        containerStyle = {{borderRadius:30}}
                        onPress ={()=> { setMonRdv({date: calendarDay.day +' '+ formatMois(calendarDay.month)+ ' ' + calendarDay.year ,heure: '17:00'}); console.log('rrrr', monRdv)}}  />
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
                        onPress = {() => {navigation.navigate('Mes rdv'); setConfirmation(false) }}
                        />
            </Overlay>

            <ScrollView style={{marginTop: 25}}>
                
        <IconBurger name= {"menu"} style={{marginLeft: 20, marginTop: 20}} color={'#125ce0'} size={35} onPress={() => { navigation.openDrawer()}} />
        <View style={{flexDirection:'row',alignItems:'center',alignSelf:'center'}}>
            <Image source={require('../../assets/Dypebleu.png')}  style={{height:66, width:127, marginBottom:30}}/>
        </View>
       
        <Card image={{ uri: annonce.images[0] }} imageStyle= {{height:250}} >
            <Text style={{marginBottom:5, fontSize:22}}>{annonce.ville} {annonce.codePostal}</Text>
            <Text style={{marginBottom:5, fontSize: 18}}>{annonce.typeDeBien}</Text>
            <Text style={{marginBottom:5}}>{annonce.nbPiece} pièces / {annonce.surface} m²</Text>
            <Text>chauffage {annonce.chauffage}</Text>
            <Text></Text>
            <Text h4 style={{marginBottom:5}}>{annonce.prix} €/mois</Text>
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
                onPress={()=>setIsVisible(true)}
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
    
  export default connect (mapStateToProps,null)(AnnonceScreen);