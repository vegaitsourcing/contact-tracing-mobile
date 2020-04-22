import React from 'react';
import { StyleSheet, Text, View, Button,Image, Dimensions } from 'react-native';

const {width:WIDTH} = Dimensions.get('window')

export default function UserInfo() {
  return (
    <View style={styles.container}>
      <Text style={styles.infoLabel}>First Name</Text>
      <Text style={styles.info}>Anica</Text>
      <Text style={styles.infoLabel}>Last Name</Text>
      <Text style={styles.info}>Sutic</Text>
      <Text style={styles.infoLabel}>Health ID</Text>
      <Text style={styles.info}>8493929u484</Text>
      <View>
        <Text style={styles.infoLabel}>Status</Text>
        <View style={styles.status}>
            <Text style={styles.info}>Negative</Text>
            <Button title="SUBMIT POSITIVE" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width : WIDTH - 50,
    justifyContent:'center'
  },
  hrLine: {
    borderBottomColor: '#0E6EB8',
    borderBottomWidth: 1,
},
infoLabel : {
    fontSize:18,
    backgroundColor:'#0E6EB8',
    color:'white',
    height:40,
    padding:10,
    justifyContent:'center'
},
info: {
    padding:10,
    fontSize:16,
},
status: {
    flexDirection:'row',
    justifyContent:'space-between'
}
});
