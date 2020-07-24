import React,{useState} from 'react';
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

    const [isCancelled, setIsCancelled] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [calendarDay, setCalendarDay] = useState('');
    const [confirmation, setConfirmation] = useState(false);
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