import React from 'react';
import { StyleSheet, View,Image, ScrollView} from 'react-native';
import {Card, Text,Button} from 'react-native-elements';

function ApercuScreen({navigation}){
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/Dypebleu.png')}  style={{height:66, width:127,marginTop:-150, marginBottom:50}}/>
      <Text h4 style={{textAlign: 'center', marginBottom:20}}>Aperçu des biens disponible</Text>
      <View style={{ height:310}}>
        <ScrollView horizontal={true}>
          
          <View style={{height:300, width: 300}}>
          <Card containerStyle={{padding: 0,paddingBottom:10}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{paddingRight:10}}><Image source={require('../../assets/livingRoom.jpg')} style = {{width:240, height:180}}/></View>
            <View style={{paddingRight:10}}><Image source={require('../../assets/livingRoom.jpg')} style = {{width:240, height:180}}/></View>
            </ScrollView>
            <Text style={{paddingBottom:5, paddingTop:10}}>Appartemnt à louer, Paris 11eme</Text>
            <Text style={{paddingBottom:20}}>2 pieces /30m2</Text>
            <Text style={{fontSize:35}}>700€/mois</Text>
          </Card>
          </View>

          <View style={{height:300, width: 300}}>
          <Card containerStyle={{padding: 0,paddingBottom:10}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{paddingRight:10}}><Image source={require('../../assets/livingRoom.jpg')} style = {{width:240, height:180}}/></View>
            <View style={{paddingRight:10}}><Image source={require('../../assets/livingRoom.jpg')} style = {{width:240, height:180}}/></View>
            </ScrollView>
            <Text style={{paddingBottom:5, paddingTop:10}}>Appartemnt à louer, Paris 11eme</Text>
            <Text style={{paddingBottom:20}}>2 pieces /30m2</Text>
            <Text style={{fontSize:35}}>700€/mois</Text>
          </Card>
          </View>

          <View style={{height:300, width: 300}}>
          <Card containerStyle={{padding: 0,paddingBottom:10}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{paddingRight:10}}><Image source={require('../../assets/livingRoom.jpg')} style = {{width:240, height:180}}/></View>
            <View style={{paddingRight:10}}><Image source={require('../../assets/livingRoom.jpg')} style = {{width:240, height:180}}/></View>
            </ScrollView>
            <Text style={{paddingBottom:5, paddingTop:10}}>Appartemnt à louer, Paris 11eme</Text>
            <Text style={{paddingBottom:20}}>2 pieces /30m2</Text>
            <Text style={{fontSize:35}}>700€/mois</Text>
          </Card>
          </View>
          
        </ScrollView>
      </View>
      <Button
           title="Créer mon dossier"
           type="solid"
           buttonStyle={{backgroundColor: "#125CE0",paddingLeft:50,paddingRight:50, marginTop:50}}  
           onPress={() => { navigation.navigate('Questionnaire')}}
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
  },
});

export default ApercuScreen;