import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image, Dimensions, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import Form from './components/Form';
import UserInfo from './components/UserInfo';
import { getUserData, removeUserData, saveUserData } from './services/userDataStorageService';

const { width: WIDTH } = Dimensions.get('window')

export default function App() {
  const [userSaved, setUserSaved] = useState(false)

  useEffect(() => {
    getUserData().then(
      data => setUserSaved(true)
    ).catch(err => {
      console.log(err)
    })
  }, [])

  const updateUserSaved = (value: boolean) => {
    setUserSaved(value)
  }

  const startContactTracing = () => {
    console.log('start');
    removeUserData().then(
      data => {
        setUserSaved(false)
      })
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.logo}>
            <Image source={require('./assets/logo.jpg')} />
          </View>
          {userSaved ? [
            <UserInfo />,
            <View style={styles.contactTracingBtn}>
              <Button title="START CONTACT TRACING" onPress={() => startContactTracing()} />
            </View>]
            :
            <Form onSaveData={setUserSaved} />
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
    top: 100,
    flex: 1,
  },
  contactTracingBtn: {
    flex: 2,
    position: 'absolute',
    bottom: 70,
    height: 50,
    borderRadius: 4,
    width: WIDTH - 50,
    justifyContent: 'center'
  }
});
