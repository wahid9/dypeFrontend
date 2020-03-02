import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function ApercuScreen() {
  return (
    <View style={styles.container}>
      <Text>APERCU ANNONCES AVEC CARROUSEL</Text>
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