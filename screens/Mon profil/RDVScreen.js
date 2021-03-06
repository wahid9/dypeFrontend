import React,{useState,useEffect} from 'react';
import { StyleSheet, View,Image,ScrollView, Alert, TouchableOpacity} from 'react-native';
import {Card, Badge, Text, Button, ListItem} from 'react-native-elements';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { Overlay } from 'react-native-elements';
import IconBurger from '@expo/vector-icons/Feather';
import IconClock from '@expo/vector-icons/MaterialCommunityIcons';
import IconCross from '@expo/vector-icons/Feather';
import {Calendar, CalendarList, Agenda, LocaleConfig} from 'react-native-calendars';
import IconAnt from 'react-native-vector-icons/AntDesign';
import {connect} from "react-redux";

function RDVScreen({navigation,data}) {

    console.log("data===", data);

    const [isCancelled, setIsCancelled] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [calendarDay, setCalendarDay] = useState('');
    const [confirmation, setConfirmation] = useState(false);

    // console.log("c'est les donnes chakal", donne)
    // console.log("la date",data[0].date.getDate(),(data[0].date.getMonth()+1),data[0].date.getFullYear());
    // const [ rdv, setRdv] = useState([])
    // console.log("la date",data[0].date.getDate(),(data[0].date.getMonth()+1),data[0].date.getFullYear());
    // console.log("data",data)

    function getHour(date){
        let hour;
        if(date.getMinutes()!=0){
            hour=date.getUTCHours()+":"+date.getMinutes()
        } else {
            hour=date.getUTCHours()+":"+date.getMinutes()+"0"
        }
        return hour;
    }
    // var rdv;

        // if(data == []){
        //     console.log("CC");
    //         rdv = <Card containerStyle={{height: 'auto'}}>
    //     <View style={{flexDirection:'row'}}>
    //         <Text style={{paddingRight:10, flex:3, fontSize:18, marginTop:5}}> Votre rendez-vous a été confirmé pour le {data[0].date.getDate()}/{(data[0].date.getMonth()+1)}/{data[0].date.getFullYear()} à { getHour(data[0].date) } </Text>
    //         <Image source={{ uri: data[0].image}} style={{height: 60, width: 90}}></Image>
    //     </View>
    //     <View style={{flexDirection:'row', justifyContent:'space-around', paddingTop:20}}>
    //         <TouchableOpacity onPress = {()=> setIsVisible(true)}>
    //         <View style={{flexDirection:'row'}}>
    //             <IconClock name={'restore-clock'} size={25} style={{marginTop:-4}}/>
    //             <Text style={{marginLeft:5}}>déplacer le rdv</Text>
    //          </View>
    //         </TouchableOpacity>
    //         <TouchableOpacity 
    //                 // onPress = {()=> setIsCancelled(true)}
    //             onPress={()=> Alert.alert("Votre rendez-vous est bien annulé")}>
    //             <View style={{flexDirection:'row'}}>
    //                 <IconCross name={'x-circle'} size={20}></IconCross>
    //                 <Text style={{marginLeft:5}}>annuler le rdv</Text>
    //             </View>
    //         </TouchableOpacity>
    //     </View>
    // </Card> 
    // }else{
    //     console.log("Salut");
    //         // rdv = <Text>TA PAS DE RDV BG </Text>
    //     }
        
    // LocaleConfig.locales['fr'] = {
    //     monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
    //     monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
    //     dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
    //     dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.'],
    //     today: 'Aujourd\'hui'
    // };
    // LocaleConfig.defaultLocale = 'fr';

    // var monthName= ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre']

    // function formatMois (mois)  {
    //     let moisEnLettre = monthName[mois-1]
    //     return moisEnLettre
    //     }
    // return (
    // <View>
    //     <Overlay 
    //         height={350}
    //         width= {330}
    //         isVisible={isCancelled}
    //         onBackdropPress={() => {setIsCancelled(false)}}>
    //     </Overlay>
    //     <Overlay 
    //         height={350}
    //         width= {330}
    //         isVisible={isVisible}
    //         onBackdropPress={() => {setIsVisible(false)}}>
    //         <Calendar
    //             current = {Date}
    //             minDate = {Date}
    //             onDayPress={(day) => {setCalendarVisible(true); setCalendarDay(day); setIsVisible(false)}}
    //         />
    //     </Overlay>
    //     <Overlay 
    //         height={350}
    //         width= {330}
    //         isVisible={calendarVisible}
    //         onBackdropPress={() => {setCalendarVisible(false)}}>
    //         <IconAnt 
    //             name = 'arrowleft' 
    //             size={20} 
    //             onPress={()=>{setIsVisible(true); setCalendarVisible(false)}}/>
    //         <ListItem 
    //             title ={calendarDay.day +' '+ formatMois(calendarDay.month)+ ' ' + calendarDay.year}
    //             titleStyle={{fontSize: 18, fontWeight:'700', textAlign:'center'}}
    //             containerStyle={{paddingTop:0}}
    //             bottomDivider/>  
    //         <Text style={{textAlign: 'center', fontSize: 16, marginTop: 15}}>Choisissez un rdv parmi les disponibilités suivantes:</Text>
    //             {/* <Text h4 style={{marginTop: 10, textAlign: "center" }}>{calendarDay.day +' '+ formatMois(calendarDay.month)+ ' ' + calendarDay.year}</Text> */}
    //             <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 20}}>
    //                 <Button 
    //                     title= '11:30'
    //                     titleStyle={{fontSize: 14}}
    //                     buttonStyle= {{backgroundColor: "#125CE0", height:44, width: 96}}
    //                     containerStyle = {{borderRadius:30}}  />
    //                 <Button 
    //                     title= '11:30'
    //                     titleStyle={{fontSize: 14}}
    //                     buttonStyle= {{backgroundColor: "#125CE0", height:44, width: 96}}
    //                     containerStyle = {{borderRadius:30}}  />
    //                 <Button 
    //                     title= '11:30'
    //                     titleStyle={{fontSize: 14}}
    //                     buttonStyle= {{backgroundColor: "#125CE0", height:44, width: 96}}
    //                     containerStyle = {{borderRadius:30}}  />
    //             </View>
    //             <Button 
    //                 title= 'Valider'
    //                 buttonStyle= {{backgroundColor: "#fce229", height:30, width: 70}}
    //                 containerStyle = {{borderRadius:30, flex: 0.9, alignSelf: 'flex-end', justifyContent: 'flex-end'}} 
    //                 onPress = {() => {setConfirmation(true); setCalendarVisible(false) }}/>
    //     </Overlay>
    //     <Overlay style={{flex:1}}
    //         height={350}
    //         width= {330}
    //         isVisible={confirmation}
    //         onBackdropPress={() => {setConfirmation(false)}}>
    //         <View style={{flex:0.8, alignItems:'center'}}>
    //             <Image source={require('../../assets/foncia.png')} style={{height: 75, width: 75}} containerStyle={{marginTop:20, marginBottom:30}}/>
    //             <Text style={{textAlign:'center', justifyContent:'center'}}>Vous venez de sélectionner un rendez-vous pour 11h30 avec l'agence Foncia du 11ème</Text>
    let rdvLocataire = data.map(function(rdv, i){
        console.log('rdv', rdv);
        return(
            <Card key={i} containerStyle={{height: 'auto'}}>
            <View style={{flexDirection:'row'}}>
                <Text style={{paddingRight:10, flex:3, fontSize:18, marginTop:5}}> Votre rendez-vous a été confirmé pour le {rdv.date.getDate()}/{(rdv.date.getMonth()+1)}/{rdv.date.getFullYear()} à { getHour(rdv.date) } </Text>
                <Image source={{ uri: rdv.image}} style={{height: 60, width: 90}}></Image>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-around', paddingTop:20}}>
                <TouchableOpacity onPress = {()=> setIsVisible(true)}>
                <View style={{flexDirection:'row'}}>
                    <IconClock name={'restore-clock'} size={25} style={{marginTop:-4}}/>
                    <Text style={{marginLeft:5}}>déplacer le rdv</Text>
                 </View>
                </TouchableOpacity>
                <TouchableOpacity 
                        // onPress = {()=> setIsCancelled(true)}
                    onPress={()=> Alert.alert("Votre rendez-vous est bien annulé")}>
                    <View style={{flexDirection:'row'}}>
                        <IconCross name={'x-circle'} size={20}></IconCross>
                        <Text style={{marginLeft:5}}>annuler le rdv</Text>
                    </View>
                </TouchableOpacity>
            </View>
       
        </Card>
        )
    })
   
    return (
    
        // <View>
        <ScrollView style={{marginTop: 25}}>
            <IconBurger name= {"menu"} style={{marginLeft: 20, marginTop: 20}} color={'#125ce0'} size={35} onPress={() => navigation.openDrawer()} />
            <View style={{flexDirection:'row',alignItems:'center',alignSelf:'center'}}>
                <Image source={require('../../assets/Dypebleu.png')}  style={{height:66, width:127, marginBottom:30,}}/>
            </View>
            <View>
                <Text h4 style={{textAlign: 'center'}}>Mes rendez-vous</Text>
                {/* <Card containerStyle={{height: 'auto'}}>
                <View style={{flexDirection:'row'}}>
                    <Text style={{paddingRight:10, flex:3, fontSize:18, marginTop:5}}> Votre rendez-vous a été confirmé pour le {data[0].date.getDate()}/{(data[0].date.getMonth()+1)}/{data[0].date.getFullYear()} à { getHour(data[0].date) } </Text>
                    <Image source={{ uri: data[0].image}} style={{height: 60, width: 90}}></Image>
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-around', paddingTop:20}}>
                    <TouchableOpacity onPress = {()=> setIsVisible(true)}>
                    <View style={{flexDirection:'row'}}>
                        <IconClock name={'restore-clock'} size={25} style={{marginTop:-4}}/>
                        <Text style={{marginLeft:5}}>déplacer le rdv</Text>
                     </View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                            // onPress = {()=> setIsCancelled(true)}
                        onPress={()=> Alert.alert("Votre rendez-vous est bien annulé")}>
                        <View style={{flexDirection:'row'}}>
                            <IconCross name={'x-circle'} size={20}></IconCross>
                            <Text style={{marginLeft:5}}>annuler le rdv</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </Card> */}
            {rdvLocataire}
        </View>
        </ScrollView>
    // </View>
    )
}

function mapStateToProps(state) { 
    console.log(state.RDV);
    return { data: state.RDV }
}
export default connect (mapStateToProps,null)(RDVScreen);