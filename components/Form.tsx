import React from "react"
import { Text, View, TextInput, Button, Alert, StyleSheet, Dimensions, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native"
import { useForm, Controller  } from 'react-hook-form'
import FormData from '../types/models/formData'
import { saveUserData } from "../services/userDataStorageService"


const {width:WIDTH} = Dimensions.get('window')

export default function Form() {
  const { control, handleSubmit, errors } = useForm<FormData>();
  const onSubmit = (data: any) =>  {
    console.log("ON SUBMIT")
    saveUserData(data)
      .then((data) => console.log("Saved data"))
      .catch((err) => console.log("Error saving data"))
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.inner}>
        <Text style={styles.label}>First name</Text>
        <Controller
            style={styles.input}
            as={TextInput}
            control={control}
            name="firstName"
            onChange={args => args[0].nativeEvent.text}
            rules={{ required: true }}
            defaultValue=""
        />
        {errors.firstName && <Text style={styles.error}>This is required.</Text>}

        <Text style={styles.label}>Last name</Text>
        <Controller
            as={TextInput}
            style={styles.input}
            control={control}
            name="lastName"
            onChange={args => args[0].nativeEvent.text}
            rules={{ required: true }}
            defaultValue=""
        />
        {errors.lastName && <Text style={styles.error}>This is required.</Text>}

        <Text style={styles.label}>Id Number</Text>
        <Controller
            as={TextInput}
            style={styles.input}
            control={control}
            name="healthId"
            onChange={args => args[0].nativeEvent.text}
            defaultValue=""
        />

            <View style={styles.button}>
                <Button color="white" title="SAVE" onPress={handleSubmit(onSubmit)} />
            </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  label: {
    color: 'black',
    marginTop: 10,
    marginBottom:5,
    marginLeft: 0,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent:'center'
  },
  button: {
    marginTop: 40,
    height: 40,
    backgroundColor: '#0E6EB8',
    borderRadius: 4,
  },
  input: {
    height: 40,
    width:WIDTH - 65,
    borderRadius: 4,
    borderWidth: 1,
    borderBottomColor:'black',
    fontSize:16,
    paddingLeft:10
  },
  error: {
    color:'red',
    marginTop:10
  }
});