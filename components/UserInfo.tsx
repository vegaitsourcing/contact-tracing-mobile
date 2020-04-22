import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image, Dimensions } from 'react-native';
import { getUserData } from '../services/userDataStorageService';
import FormData from '../types/models/formData'

const { width: WIDTH } = Dimensions.get('window')

const UserInfo = (props:any) => {

  const [userData, setUserData] = useState<FormData | null>(null)

  useEffect(() => {
    getUserData().then(
      data => { console.log('ENTER USER DATA GET'); setUserData(data) }
    )
  }, [])

  const submitPositiveResults = () => {
    console.log('positive')
  }

  const updateMode= () => {
    props.setUpdateMode(true)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.infoLabel}>First Name</Text>
      {userData && <Text style={styles.info}>{userData.firstName}</Text>}
      <Text style={styles.infoLabel}>Last Name</Text>
      {userData && <Text style={styles.info}>{userData.lastName}</Text>}
      <Text style={styles.infoLabel}>Health ID</Text>
      {userData && <Text style={styles.info}>{userData.healthId}</Text>}
      <View>
        <Text style={styles.infoLabel}>Status</Text>
        <View style={styles.status}>
          <Text style={styles.info}>Negative</Text>
          <Button title="SUBMIT POSITIVE" onPress={() => submitPositiveResults()} />
        </View>
      </View>
      <View style={styles.updateBtn}>
        <Button title="UPDATE INFO" onPress={() => updateMode()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    marginTop: 170,
    justifyContent: 'flex-start',
    width: WIDTH - 50,
  },
  infoLabel: {
    fontSize: 18,
    backgroundColor: '#0E6EB8',
    color: 'white',
    height: 30,
    padding: 4,
    justifyContent: 'center'
  },
  info: {
    padding: 10,
    fontSize: 16,
  },
  status: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  updateBtn: {
    marginTop:40,
    borderWidth:1,
    borderColor:"#0E6EB8"
  }
});

export default UserInfo;
