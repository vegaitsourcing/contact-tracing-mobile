import React, { useEffect } from "react"
import { Text, View, TextInput, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from "react-native"
import { useForm, Controller } from 'react-hook-form'
import FormData, { userStatus } from '../types/models/formData'
import { saveUserData, getUserData } from "../services/userDataStorageService"


const { width: WIDTH } = Dimensions.get('window')

const Form = (props: any) => {
    const { control, handleSubmit, errors, setValue } = useForm<FormData>();

    useEffect(() => {
        if (props.updateMode) {
            getUserData().then(
                data => {
                    setValue('firstName', data.firstName ? data.firstName : "");
                    setValue('lastName', data.lastName ? data.lastName : "");
                    setValue('healthId', data.healthId ? data.healthId : "");
                }
            )
        }
    }, [])

    const onSubmit = (data: FormData) => {
        if (!data.status)
            data.status = userStatus.NEGATIVE
        saveUserData(data)
            .then((data) => props.onSaveData(true)
            ).catch((err) => console.log("Error saving data"))
    }

    return (
        <ScrollView style={styles.scrollView}>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={styles.label}>FIRST NAME</Text>
                <Controller
                    style={styles.input}
                    as={TextInput}
                    control={control}
                    name="firstName"
                    onChange={args => args[0].nativeEvent.text}
                    rules={{ required: true }}
                    defaultValue={""}
                />
                {errors.firstName && <Text style={styles.error}>This field is required.</Text>}

                <Text style={styles.label}>LAST NAME</Text>
                <Controller
                    as={TextInput}
                    style={styles.input}
                    control={control}
                    name="lastName"
                    onChange={args => args[0].nativeEvent.text}
                    rules={{ required: true }}
                    defaultValue={""}
                />
                {errors.lastName && <Text style={styles.error}>This field is required.</Text>}

                <Text style={styles.label}>HEALTH ID</Text>
                <Controller
                    as={TextInput}
                    style={styles.input}
                    control={control}
                    name="healthId"
                    onChange={args => args[0].nativeEvent.text}
                    rules={{ required: true }}
                    defaultValue={""}
                />
                {errors.healthId && <Text style={styles.error}>This field is required.</Text>}
                <TouchableOpacity onPress={handleSubmit(onSubmit)}>
                    <View style={styles.buttonSave}>
                        <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>SAVE</Text>
                    </View>
                </TouchableOpacity>
                {props.updateMode &&
                    <TouchableOpacity onPress={() => props.onSaveData(false)}>
                        <View style={styles.buttonCancel}>
                            <Text style={styles.btnCancelText}>CANCEL</Text>
                        </View>
                    </TouchableOpacity>
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        width: "100%",
    },
    label: {
        marginTop: 10,
        marginBottom: 5,
        fontSize: 16,
        fontWeight: 'bold',
        color: "#0E6EB8",
        textAlign: 'left'
    },
    buttonSave: {
        backgroundColor: "#0E6EB8",
        borderWidth: 1,
        borderColor: '#0E6EB8',
        borderRadius: 50,
        width: WIDTH - 65,
        height: 50,
        marginTop: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonCancel: {
        borderWidth: 1,
        borderColor: '#0E6EB8',
        borderRadius: 50,
        width: WIDTH - 65,
        height: 50,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnCancelText: {
        fontSize: 20,
        color: '#0E6EB8',
        fontWeight: 'bold'
    },
    input: {
        height: 50,
        width: WIDTH - 65,
        borderRadius: 10,
        borderWidth: 1,
        fontSize: 16,
        paddingLeft: 10,
        borderColor: "#0E6EB8"
    },
    error: {
        color: 'red',
        marginTop: 10
    }
});

export default Form;