import React, { useState } from "react"
import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity, Alert, ShadowPropTypesIOS } from "react-native"
import Loading from "./Loading"

const { width: WIDTH } = Dimensions.get('window')

const CheckContacts = (props:any) => {

    const [loading, setLoading] = useState(false);

    const checkContacts = () => {
        setLoading(true)
    }

    function createAlert() {
        return (
            Alert.alert(
                "Check Contacts",
                "Are you sure you want to download new diagnoses from server?",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "OK", onPress: () => checkContacts() }
                ],
                { cancelable: false }
            )
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.innerLogo}>
                <Image source={require('../assets/logo.jpg')} />
            </View>
            {loading ?
                <Loading setLoading={setLoading} />
                : [
                    <View style={styles.innerCont}>
                        <Text style={styles.text}>SMISLITI TEXT</Text>
                    </View>,
                    <View style={styles.innerBtn}>
                        <TouchableOpacity onPress={() => createAlert()}>
                            <View style={styles.trackingBtn}>
                                <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>CHECK</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
                            <View style={styles.backBtn}>
                                <Text style={{ fontSize: 20, color: '#0E6EB8', fontWeight: 'bold' }}>BACK</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ]

            }
        </View>
    )
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
    text: {
        padding: 20,
        marginTop: 40,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0E6EB8',
        fontStyle: 'italic',
        textAlign: 'center'
    },
    innerBtn: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    backBtn: {
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


export default CheckContacts;
