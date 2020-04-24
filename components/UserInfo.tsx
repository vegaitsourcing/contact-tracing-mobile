import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { getUserData } from '../services/userDataStorageService';
import FormData from '../types/models/formData';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons'

const { width: WIDTH } = Dimensions.get('window')

const UserInfo = (props: any) => {

  const [userData, setUserData] = useState<FormData | null>(null)

  useEffect(() => {
    getUserData().then(
      data => { setUserData(data) }
    )
  }, [])

  const submitPositiveResults = () => {
    props.setSubmitMode(true)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.infoLabel}>FIRST NAME</Text>
      {userData && <Text style={styles.info}>{userData.firstName}</Text>}
      <Text style={styles.infoLabel}>LAST NAME</Text>
      {userData && <Text style={styles.info}>{userData.lastName}</Text>}
      <Text style={styles.infoLabel}>HEALTH ID</Text>
      {userData && <Text style={styles.info}>{userData.healthId}</Text>}
      <View>
        <Text style={styles.infoLabel}>STATUS</Text>
        <View style={styles.status}>
          <Text style={styles.infoStatus}>
            {userData?.status == 0 && 'Negative'}
            {userData?.status == 1 && 'Waiting Approval'}
            {userData?.status == 2 && 'Positive'}
          </Text>
          <TouchableOpacity onPress={() => submitPositiveResults()}>
            <View style={styles.submitPositive}>
              <Text style={styles.submitPositiveText}>SUBMIT POSITIVE</Text>
              <FontAwesomeIcon color="#66b2ff" icon={faUpload} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: WIDTH - 50,
    borderColor: "#0E6EB8",
    borderWidth: 1,
    marginTop: 10
  },
  infoLabel: {
    fontSize: 18,
    backgroundColor: '#0E6EB8',
    color: 'white',
    height: 50,
    padding: 13,
    textAlign: "center"
  },
  info: {
    padding: 15,
    fontSize: 18,
    textAlign: 'center',
    fontStyle: 'italic'
  },
  infoStatus: {
    padding: 15,
    fontSize: 18,
    textAlign: 'center',
  },
  status: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  submitPositive: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 5,
  },
  submitPositiveText: {
    fontSize: 16,
    color: '#66b2ff',
    fontWeight: 'bold',
    marginRight: 5
  }
});

export default UserInfo;
