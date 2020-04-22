import React from 'react';
import { StyleSheet, Text, View, Button,Image, Dimensions } from 'react-native';

const {width:WIDTH} = Dimensions.get('window')

export default function UserInfo() {
  return (
    <View style={styles.container}>
      <Text>First Name</Text>
      <Text>Anica</Text>
      <View style={styles.hrLine} />
      <Text>Last Name</Text>
      <Text>Sutic</Text>
      <View style={styles.hrLine} />
      <Text>Health ID</Text>
      <Text>8493929u484</Text>
      <View style={styles.hrLine} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    width : WIDTH - 50,
  },
  hrLine: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
}
});
