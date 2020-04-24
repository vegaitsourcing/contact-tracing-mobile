import React, { useEffect, useState } from "react"
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from "react-native"
import { getUserData } from "../services/userDataStorageService"
import Loading from "./Loading"


const { width: WIDTH } = Dimensions.get('window')

const SubmitPositive = (props: any) => {
    const [healthId, setHealthId] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getUserData().then(
            data => {
                setHealthId(data.healthId)
            }
        )
    }, [])

    const submitPositiveResults = () => {
        console.log("SEND REQUEST")
        setLoading(true)
    }


    return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {loading ? <Loading setLoading={setLoading} /> : [
                <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.label}>HEALTH ID</Text>
                    <Text style={styles.healthId}>{healthId}</Text>
                </View>,
                <View style={{ flex: 1, marginBottom: 100, alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => submitPositiveResults()}>
                        <View style={styles.buttonSave}>
                            <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>SUBMIT</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.setSubmitMode(false)}>
                        <View style={styles.buttonCancel}>
                            <Text style={styles.btnCancelText}>CANCEL</Text>
                        </View>
                    </TouchableOpacity>
                </View>]}
            </View>
    )
}

const styles = StyleSheet.create({
                    label: {
                    marginTop: 10,
        marginBottom: 5,
        fontSize: 16,
        fontWeight: 'bold',
        color: "#0E6EB8",
        textAlign: 'left'
    },
    healthId: {
                    fontSize: 40,
        fontStyle: 'italic'
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
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnCancelText: {
                    fontSize: 20,
        color: '#0E6EB8',
        fontWeight: 'bold'
    }
});

export default SubmitPositive;