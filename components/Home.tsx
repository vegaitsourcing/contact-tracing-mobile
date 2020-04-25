import React, { useEffect, useState, Fragment } from 'react';
import { StyleSheet, Text, View, Alert, Image, Dimensions, TouchableOpacity } from 'react-native';
import { demoCrypto, generateTracingKey } from '../services/cryptoService';
import { getTracingKey, saveTracingKey, saveAppStatus, getAppStatus, removeTracingKey } from '../services/tokenStorageService';
import { AppStatus } from '../types/models/appStatus';

const { width: WIDTH } = Dimensions.get('window')

const Home = (props:any) => {
  const [tracing, setTracing] = useState(false)


  useEffect(() => {
    getAppStatus().then(
      data => setTracing(data)
    ).catch(err => {
      console.log(err)
    })
  }, [])

  const startContactTracing = () => {
    var tracingKey = ''
    getTracingKey().then(data => {
      if (!data) {
        tracingKey = generateTracingKey()
        saveTracingKey(tracingKey)
      } else {
        tracingKey = data
      }
      demoCrypto(tracingKey)
      saveAppStatus(AppStatus.TRACING)
      setTracing(true)
    }).catch(err => alert("Failed setting tracing key"))

  }

  const stopContactTracing = () => {
    removeTracingKey().
      then(data => {
        saveAppStatus(AppStatus.NOT_TRACING)
        setTracing(false)
      })
      .catch(err => {
        alert("error")
      })
  }


  function createTwoButtonAlert(value: boolean) {
    if (value) {
      Alert.alert(
        "Start Tracing",
        "Are you sure you want to enable tracing contacts?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => startContactTracing() }
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert(
        "Stop Tracing",
        "Are you sure you want to stop tracing contacts?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => stopContactTracing() }
        ],
        { cancelable: false }
      );
    }
  }

  function renderBtn() {
    return (
      <Fragment>
          <View style={styles.innerBtn}>
            <TouchableOpacity onPress={() => props.navigation.navigate('Check')}>
            <View style={styles.checkBtn}>
              <Text style={{ fontSize: 20, color: '#0E6EB8', fontWeight: 'bold' }}>CHECK CONTACTS</Text>
            </View>
          </TouchableOpacity>
            {!tracing ?
              <TouchableOpacity onPress={() => createTwoButtonAlert(true)}>
                <View style={styles.trackingBtn}>
                  <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>START CONTACT TRACING</Text>
                </View>
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={() => createTwoButtonAlert(false)}>
                <View style={styles.trackingBtnStop}>
                  <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>STOP CONTACT TRACING</Text>
                </View>
              </TouchableOpacity>
            }
          </View>
      </Fragment>
    );
  }

  return (
        <View style={styles.container}>
          <View style={styles.innerLogo}>
            <Image source={require('../assets/logo.jpg')} />
            </View>
          <View style={styles.innerCont}>
            <Text style={styles.title}>COVID Contact Notifier</Text>
            <Text style={styles.text}>A mobile app that helps people (with their consent) be notified if they were in contact with a person was diagnosed with COVID-19.</Text>
          </View>
          {renderBtn()}
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  innerLogo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  innerCont: {
    flex: 2,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 50,
  },
  title: {
    fontSize:30,
    fontWeight:'bold',
    color:'#0E6EB8',
    fontStyle:'italic'
  },
  text: {
    padding:20,
    marginTop:40,
    fontSize:20,
    fontWeight:'bold',
    color:'#0E6EB8',
    fontStyle:'italic',
    textAlign:'center'
  },
  innerBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  checkBtn: {
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
  },
  trackingBtnStop: {
    backgroundColor: "#ff0000",
    borderWidth: 1,
    borderColor: '#ff0000',
    borderRadius: 50,
    height: 50,
    width: WIDTH - 50,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default Home;
