import React from 'react';
import { StyleSheet,  View, ScrollView } from 'react-native';
import {Button, Image, Text, ListItem} from 'react-native-elements';

function AnnonceScreen() {
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

export default AnnonceScreen;