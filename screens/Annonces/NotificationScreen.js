import React, { useState, useEffect, useRef } from 'react';
import IconBurger from '@expo/vector-icons/Feather';
import {Text, Card} from 'react-native-elements';
import { View,Image,ScrollView,
  Button, Platform} from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';

// Partie Notif
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Partie Notif

function Notification({navigation,user}){

// Partie Notif

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      // console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  async function registerForPushNotificationsAsync() {

    let token;

    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        alert("Échec de l'obtention d'autorisation pour envoyer les notifications !");
        return;
      }

      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }

  async function sendPushNotification(expoPushToken) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `${user.notification[0].etatDuDossier}📬`,
        body: `${user.notification[0].messageAgence}`,
      },
      trigger: { seconds: 1 },
    });
  }
// Partie Notif 
  console.log('user du reducer', user)

  var notifMessage;
  if(user.notifications.length == 0){
    notifMessage = <Text>Vous n'avez pas de notifications</Text>
  } else {
    notifMessage = user.notification.map( (notif) =>{
      return(
      <Card containerStyle={{borderColor:"white", borderRadius:"20", marginTop:10, marginBottom:20}}>
          <Text style={{color:"#125ce0", fontSize:"23%",marginBottom:"5%"}}>{notif.etatDuDossier}</Text>
          <Text>{notif.messageAgence}</Text>
          <IconFontAwesome style={{alignSelf: 'flex-end', marginRight:5}}
              name="trash"
              size={25}
              color="#125ce0"
              onPress={()=> console.log("wsh bien ou quoi?")}/>
      </Card>)
  })
  }

// console.log("user.email ==>", user.notification);

      return(
        <View style={{backgroundColor:'white', flex:1}}>
            <View  style={{marginTop:'12%'}}>
                <View style={{flexDirection:'row',justifyContent:'space-around',marginBottom:'5%'}}>
                    <IconBurger name= {"menu"} style={{marginTop:'4%',marginLeft:'-5%'}} color={'#125ce0'} size={35} onPress={() => navigation.openDrawer()} />
                    <Image source={require('../../assets/Dypebleu.png')}  style={{height:66, width:127}}/>
                    <IconFontAwesome style={{marginTop:'4%',marginRight:'-5%'}}
                    name='user'
                    size={30}
                    color= 'white'/>
                </View>
            </View>
            <Text h4 style={{textAlign: 'center', marginBottom:"5%"}}>Mes notifications</Text>
                <ScrollView style={{marginBottom:'16%'}}>
                { notifMessage }
                    <View
      style={{
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>

      {/* <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>hmar: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        </View> */}
          {/* <Button
          title="Press to schedule a notification"
          onPress={async () => {
          await sendPushNotification();
          }}/> */}
        </View>
      </ScrollView>
      </View>
    )
}

function mapStateToProps(state){
  return { user: state.user}
}

export default connect(mapStateToProps,null)(Notification);