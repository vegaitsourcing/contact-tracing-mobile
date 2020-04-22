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
      <Text style={styles.infoLabel}>First Name</Text>
      {userData && <Text style={styles.info}>{userData.firstName}</Text>}
      <Text style={styles.infoLabel}>Last Name</Text>
      {userData && <Text style={styles.info}>{userData.lastName}</Text>}
      <Text style={styles.infoLabel}>Health ID</Text>
      {userData && <Text style={styles.info}>{userData.healthId}</Text>}
      <Text style={styles.infoLabel}>Status</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:2,
    justifyContent: 'center',
    width : WIDTH - 50,
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
