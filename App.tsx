import React from 'react';
import { StyleSheet, Text, View, Button,Image, Dimensions } from 'react-native';
import Form from './components/Form';
import UserInfo from './components/UserInfo';
const {width:WIDTH} = Dimensions.get('window')

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={require('./assets/logo.jpg')} />
      </View>
      {/* <Form/> */}
      <UserInfo />
      <View style={styles.contactTracingBtn}>
        <Button  title="START CONTACT TRACING" />
      </View>
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
  logo: {
    position: 'absolute',
    top:100,
    flex:1,
    backgroundColor:'red'
  },
  contactTracingBtn: {
    flex:2,
    position: 'absolute',
    bottom:70,
    height: 50,
    //backgroundColor: '#0E6EB8',
    borderRadius: 4,
    width: WIDTH - 50,
    justifyContent:'center'
  }
});
