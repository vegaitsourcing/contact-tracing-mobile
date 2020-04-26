import React, { useState, useEffect, useRef } from "react"
import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity, Alert, Modal, TouchableHighlight } from "react-native"
import Loading from "./Loading"
import ModalPopup from "./ModalPopup"
import { fetchDiagnosisKeys } from "../services/serverCommunicationService"

const { width: WIDTH } = Dimensions.get('window')

const CheckContacts = (props: any) => {

    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const prevCount = usePrevious(loading)
    useEffect(() => {
        if (!loading && prevCount) {
            setModalVisible(true)
        }
    }, [loading])

    function usePrevious(value: any) {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }

    const checkContacts = () => {
        // ovde pozvati metodu za getDiagnosis       
        setLoading(true)
        fetchDiagnosisKeys().then( res => {
            console.log("Got data: ", res.data)
            setLoading(false);
        }).catch(err => {
            console.log("Error fetching data: ",err)
            //setLoading(false)
        })
        // setTimeout(function () {
        //     setLoading(false);
        // }, 3000)
    }

    function createAlertCheck() {
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
            <ModalPopup visible={modalVisible} setVisible={setModalVisible} />
            {loading ?
                <Loading />
                : [
                    <View style={styles.innerCont}>
                        {!modalVisible &&
                            <Text style={styles.text}>
                                By clicking the check button you can find out if you have recently been in contact with an infected person</Text>
                        }
                    </View>,
                    <View style={styles.innerBtn}>
                        {!modalVisible &&
                            <TouchableOpacity onPress={() => createAlertCheck()}>
                                <View style={styles.btn}>
                                    <Text style={{ ...styles.btnText, color: '#0E6EB8' }}>CHECK</Text>
                                </View>
                            </TouchableOpacity>}
                        {!modalVisible &&
                            <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
                                <View style={{ ...styles.btn, backgroundColor: "#0E6EB8" }}>
                                    <Text style={styles.btnText}>BACK</Text>
                                </View>
                            </TouchableOpacity>}
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
        justifyContent: "flex-end",
    },
    innerCont: {
        flex: 2,
        alignItems: "center",
        justifyContent: "center",
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
        flex: 2,
        alignItems: "center",
        justifyContent: "center"
    },
    btn: {
        borderWidth: 1,
        borderColor: '#0E6EB8',
        borderRadius: 50,
        height: 50,
        width: WIDTH - 50,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    }
});


export default CheckContacts;
