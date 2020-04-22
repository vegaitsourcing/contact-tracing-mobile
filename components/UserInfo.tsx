import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button,Image, Dimensions } from 'react-native';
import { getUserData } from '../services/userDataStorageService';
import FormData from '../types/models/formData'

const {width:WIDTH} = Dimensions.get('window')

export default function UserInfo() {
  
  const [userData, setUserData] = React.useState<FormData | null>(null)

  useEffect(() => {
    getUserData().then(
      
      data => {console.log('ENTER USER DATA GET'); setUserData(data)}
    )
}, []) 
  
  return (
    <View style={styles.container}>
      <Text>First Name</Text>
      {userData && <Text>{userData.firstName}</Text>}
      <View style={styles.hrLine} />
      <Text>Last Name</Text>
      {userData && <Text>{userData.lastName}</Text>}
      <View style={styles.hrLine} />
      <Text>Health ID</Text>
      {userData && <Text>{userData.healthId}</Text>}
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
