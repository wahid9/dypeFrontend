import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/DYPE_noir_blanc.png')}
        style={{width: 125, height: 65, marginTop: 60}}
      />
      <Text>
        Merci de remplir le questionnaire afin d'acceder aux annonces
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#125ce0',
    alignItems: 'center',
  },
});

