import React from 'react';
import { StyleSheet,  View, ScrollView } from 'react-native';
import {Button, Image, Text, ListItem} from 'react-native-elements';

export default function App() {
    return (
        <ScrollView style={{marginTop: 50}}>
            <View style={styles.container}>
                <Image source={require('./assets/Dypebleu.png')}  style={{height:66, width:127, marginTop:0,marginBottom:0}}/>
            </View>
                <Image source={require('./assets/livingRoom.jpg')} style={{height:250, width:380, marginTop:0,marginBottom:0}}/>
                
                    {/* <Text style={{fontSize: 16}}>Appartement à louer Paris 11ème, 2 pièces/30m², 700€/mois </Text> */}
                    <ListItem
                        title='Appartement à louer, Paris 11ème, 2 pièces/30m², 700€/mois' 
                        titleStyle={{fontSize: 16}}
                        bottomDivider
                        />
                    <ListItem
                        title='Description:'
                        titleStyle={{fontSize: 13, fontWeight: 'bold'}}
                        subtitle={
                           <Text style={{fontSize: 13, paddingTop:10}}>surface de 30m²{"\n"}construit en 1996{"\n"}4ème étage{"\n"}2 pièces{"\n"}1 chambre</Text>
                       }
                        bottomDivider 
                       />
                        
                        <ListItem
                        title="L'appartement:"
                        titleStyle={{fontSize: 13, fontWeight: 'bold'}}
                        subtitle={
                           <Text style={{fontSize: 13, paddingTop:10}}>1 Salle de bain{"\n"}1 Toilette{"\n"}Parquet{"\n"}2 pièces{"\n"}Chauffage individuel</Text>
                       }
                        bottomDivider 
                       />
                    
                    <View style={styles.container}>
                    <Button
                        title="Prendre un rendez-vous"
                        buttonStyle= {{backgroundColor: "#125CE0", borderRadius:5, paddingLeft:10,paddingRight:10, marginTop: 20, height: 35}}
                    />
                    </View>     
                    


        </ScrollView>
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