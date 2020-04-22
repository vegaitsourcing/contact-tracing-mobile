import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image, Dimensions, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import Form from './components/Form';
import UserInfo from './components/UserInfo';
import { getUserData, removeUserData, saveUserData } from './services/userDataStorageService';

const { width: WIDTH } = Dimensions.get('window')

export default function App() {
  const [userSaved, setUserSaved] = useState(false)
  const [updateMode, setUpdateMode] = useState(false)

  useEffect(() => {
    getUserData().then(
      data => setUserSaved(true)
    ).catch(err => {
      console.log(err)
    })
  }, [])

  const startContactTracing = () => {
    console.log('start');
    removeUserData().then(
      data => {
        setUserSaved(false)
      })
  }

  const saveFromData = () => {
    setUserSaved(true);
    setUpdateMode(false)
  }

  console.log(userSaved)
  console.log(updateMode)

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{flex:1, marginTop:80}}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.logo}>
            <Image source={require('./assets/logo.jpg')} />
          </View>
          {userSaved && !updateMode ? [
            <UserInfo setUpdateMode={setUpdateMode} />,
            <View style={styles.contactTracingBtn}>
              <Button title="START CONTACT TRACING" onPress={() => startContactTracing()} />
            </View>]
            :
            <Form onSaveData={saveFromData} updateMode={updateMode}/>
          }
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
    top: 0,
    flex: 1,
  },
  contactTracingBtn: {
    flex: 2,
    position: 'absolute',
    bottom: 70,
    height: 50,
    borderRadius: 4,
    width: WIDTH - 50,
    justifyContent: 'center',
    borderWidth:1,
    borderColor:"#0E6EB8"
  }
});
