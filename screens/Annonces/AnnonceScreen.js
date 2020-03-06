import React, {useState} from 'react';
import { StyleSheet,  View, ScrollView } from 'react-native';
import {Button, Image, Text, ListItem, Overlay, Badge, Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconAnt from 'react-native-vector-icons/AntDesign';
import {Calendar, CalendarList, Agenda, LocaleConfig} from 'react-native-calendars';
import IconBurger from '@expo/vector-icons/Feather';
import { createDrawerNavigator } from '@react-navigation/drawer';

function AnnonceScreen({navigation}) {

    const [isVisible, setIsVisible] = useState(false);
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [calendarDay, setCalendarDay] = useState('');
    const [confirmation, setConfirmation] = useState(false);
    const [monRdv, setMonRdv] = useState ({});
    const [opacity, setOpacity] = useState(1)
 

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
    // console.log("drtfgyuhjiuhgytfdrtgyuh", calendarDay)

    var handleSubmitHour = () => {setMonRdv({date: calendarDay.day +' '+ formatMois(calendarDay.month)+ ' ' + calendarDay.year ,heure: '14:30'})}
    // console.log('rrrr', monRdv)
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
                    onDayPress={(day) => handleSubmit(day)}
                    />
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
                    {/* <Text h4 style={{marginTop: 10, textAlign: "center" }}>{calendarDay.day +' '+ formatMois(calendarDay.month)+ ' ' + calendarDay.year}</Text> */}
                    <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 20}}>

                        <Button 
                            title= '11:30'
                            titleStyle={{fontSize: 14}}
                            buttonStyle= {{backgroundColor: "#125CE0", height:44, width: 96, opacity: 0.5}}
                            containerStyle = {{borderRadius:30}} 
                            onPress ={()=> { setMonRdv({date: calendarDay.day +' '+ formatMois(calendarDay.month)+ ' ' + calendarDay.year ,heure: '11:30'}); console.log('rrrr', monRdv)}}
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
                        onPress = {() => {navigation.navigate('RendezVous'); setConfirmation(false) }}
                        />
            </Overlay>

            <ScrollView style={{marginTop: 25}}>
                
            <IconBurger name= {"menu"} style={{marginLeft: 20, marginTop: 20}} color={'#125ce0'} size={35} onPress={() => navigation.openDrawer()} />
            <View style={{flexDirection:'row',alignItems:'center',alignSelf:'center'}}>
                <Image source={require('../../assets/Dypebleu.png')}  style={{height:66, width:127, marginBottom:30,}}/>
            </View>
                
                    <Image source={require('../../assets/livingRoom.jpg')} style={{height:250, width:'100%', marginTop:0,marginBottom:0}}/>
                    
                        {/* <Text style={{fontSize: 16}}>Appartement à louer Paris 11ème, 2 pièces/30m², 700€/mois </Text> */}
                        <ListItem
                            title='Appartement à louer, Paris 11ème, 2 pièces/30m², 700€/mois' 
                            titleStyle={{fontSize: 16}}
                            bottomDivider
                            />
                        <ListItem
                            title='Description:'
                            titleStyle={{fontSize: 13, fontWeight: 'bold', paddingBottom: 10}}
                            subtitle={
                                <View>
                                    <Text style={{fontSize: 13}}>surface de 30m²</Text>
                                    <Text style={{fontSize: 13}}>construit en 1996</Text>
                                    <Text style={{fontSize: 13}}>4ème étage</Text>
                                    <Text style={{fontSize: 13}}>2 pièces</Text>
                                    <Text style={{fontSize: 13}}>1 chambre</Text>
                                </View>
                        }
                            bottomDivider 
                        />
                            
                            <ListItem
                            title="L'appartement:"
                            titleStyle={{fontSize: 13, fontWeight: 'bold', paddingBottom: 10}}
                            subtitle={
                                <View>
                                    <Text style={{fontSize: 13}}>1 Salle de bain</Text>
                                    <Text style={{fontSize: 13}}>1 Toilette</Text>
                                    <Text style={{fontSize: 13}}>Parquet</Text>
                                    <Text style={{fontSize: 13}}>Chauffage individuel</Text>
                                </View>
                        }
                            bottomDivider 
                        />
                        
            </ScrollView>
                        

            <Button
                icon={
                    <Icon
                    name="calendar-o"
                    size={20}
                    color="#ffffff"
                    style= {{marginRight : 5}}
                    />
                }
                onPress={()=>setIsVisible(true)}
                title="Prendre un rendez-vous"
                buttonStyle= {{backgroundColor: "#125CE0"}}
                containerStyle={{height: 35, marginBottom: 10}}
            />
  
                        


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

export default AnnonceScreen