import React, { useEffect, useState, Fragment } from 'react';
import { StyleSheet, Text, View, Button, Image, Dimensions, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, Keyboard, TouchableOpacity } from 'react-native';
import Form from './components/Form';
import UserInfo from './components/UserInfo';
import { getUserData, removeUserData, saveUserData } from './services/userDataStorageService';
import SubmitPositive from './components/SubmitPositive';
import { demoCrypto } from './services/cryptoService';

const { width: WIDTH } = Dimensions.get('window')

export default function App() {
  const [userSaved, setUserSaved] = useState(false)
  const [updateMode, setUpdateMode] = useState(false)
  const [submitMode, setSubmitMode] = useState(false)

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

  function renderContainer() {
  return (
      <Fragment>
        {userSaved && !updateMode && !submitMode && [
          <UserInfo setUpdateMode={setUpdateMode} setSubmitMode={setSubmitMode} />,
              <TouchableOpacity onPress={() => onModeChange()}>
                <View style={styles.updateBtn}>
                  <Text style={{ fontSize: 20, color: '#0E6EB8', fontWeight: 'bold' }}>UPDATE INFO</Text>
                </View>
              </TouchableOpacity>
            ]
        }
        {(!userSaved || updateMode) && !submitMode &&
              <Form onSaveData={saveFromData} updateMode={updateMode} />
            }
        {userSaved && submitMode && !updateMode &&
          <SubmitPositive setSubmitMode={setSubmitMode} />
        }
      </Fragment>
    )
  }

  function renderBtn() {
    return (
      <Fragment>
      {userSaved && !updateMode && !submitMode &&
            <View style={styles.innderBtn}>
              <TouchableOpacity onPress={() => startContactTracing()}>
                <View style={styles.trackingBtn}>
                  <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>START CONTACT TRACING</Text>
                </View>
              </TouchableOpacity>
            </View>
          }
      </Fragment>
    );
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
            {renderContainer()}
          </View>
            {renderBtn()}
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
