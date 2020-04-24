import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image, Dimensions, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, Keyboard, TouchableOpacity } from 'react-native';
import Form from './components/Form';
import UserInfo from './components/UserInfo';
import { getUserData, removeUserData, saveUserData } from './services/userDataStorageService';
import { demoCrypto } from './services/cryptoService';

const { width: WIDTH } = Dimensions.get('window')

export default function App() {
  const [userSaved, setUserSaved] = useState(false)
  const [updateMode, setUpdateMode] = useState(false)

  useEffect(() => {
    demoCrypto()
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

  const saveFromData = (value: boolean) => {
    if (value) {
      setUserSaved(true);
    }
    setUpdateMode(false)
  }

  const onModeChange = () => {
    setUpdateMode(true)
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.innerLogo}>
            <Image source={require('./assets/logo.jpg')} />
          </View>
          <View style={styles.innderCont}>
            {userSaved && !updateMode ? [
              <UserInfo setUpdateMode={setUpdateMode} />,
              <TouchableOpacity onPress={() => onModeChange()}>
                <View style={styles.updateBtn}>
                  <Text style={{ fontSize: 20, color: '#0E6EB8', fontWeight: 'bold' }}>UPDATE INFO</Text>
                </View>
              </TouchableOpacity>
            ]
              :
              <Form onSaveData={saveFromData} updateMode={updateMode} />
            }
          </View>
          {userSaved && !updateMode &&
            <View style={styles.innderBtn}>
              <TouchableOpacity onPress={() => startContactTracing()}>
                <View style={styles.trackingBtn}>
                  <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>START CONTACT TRACING</Text>
                </View>
              </TouchableOpacity>
            </View>
          }
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  innerLogo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  innderCont: {
    flex: 4,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 50,
  },
  innderBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  updateBtn: {
    borderWidth: 1,
    borderColor: '#0E6EB8',
    borderRadius: 50,
    height: 50,
    width: WIDTH - 50,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trackingBtn: {
    backgroundColor: "#0E6EB8",
    borderWidth: 1,
    borderColor: '#0E6EB8',
    borderRadius: 50,
    height: 50,
    width: WIDTH - 50,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
