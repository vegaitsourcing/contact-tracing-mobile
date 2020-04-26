import React, { useEffect, useState, Fragment } from 'react';
import { StyleSheet, Text, View, Alert, Image, Dimensions, TouchableOpacity } from 'react-native';
import { saveAppStatus, getAppStatus } from '../services/storageService';
import { AppStatus } from '../types/models/appStatus';
import Loading from './Loading';
import { pushDiagnosisKeys } from '../services/serverCommunicationService';

const { width: WIDTH } = Dimensions.get('window')

const Home = (props: any) => {
    const [tracing, setTracing] = useState(false)
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        getAppStatus().then(
            data => {
                setTracing(data)
            }
        ).catch(err => {
            console.log(err)
        })
    }, [])

    const sendDailyKeys = () => {
        setLoading(true)
        pushDiagnosisKeys().then(() => {
            setTimeout(function () {
                setLoading(false);
            }, 3000)
        }).catch(err => console.log("Error fetching keys: ", err))

    }

    const startContactTracing = () => {
        saveAppStatus(AppStatus.TRACING)
        setTracing(true)
    }

    const stopContactTracing = () => {
        saveAppStatus(AppStatus.NOT_TRACING)
        setTracing(false)
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
                <TouchableOpacity onPress={() => props.navigation.navigate('Check')}>
                    <View style={styles.btn}>
                        <Text style={{ ...styles.btnText, color: '#0E6EB8' }}>CHECK CONTACTS</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => sendDailyKeys()}>
                    <View style={{ ...styles.btn, backgroundColor: "#0E6EB8" }}>
                        <Text style={styles.btnText}>SEND DAILY KEYS</Text>
                    </View>
                </TouchableOpacity>
                {tracing ?
                    <TouchableOpacity onPress={() => createTwoButtonAlert(false)}>
                        <View style={{ ...styles.btn, backgroundColor: "#ff0000" }}>
                            <Text style={styles.btnText}>STOP CONTACT TRACING</Text>
                        </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => createTwoButtonAlert(true)}>
                        <View style={{ ...styles.btn, backgroundColor: "#0E6EB8" }}>
                            <Text style={styles.btnText}>START CONTACT TRACING</Text>
                        </View>
                    </TouchableOpacity>
                }
            </Fragment>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.innerLogo}>
                <Image source={require('../assets/logo.jpg')} />
            </View>
            {loading ? <Loading /> : [
                <View style={styles.innerCont}>
                    <Text style={styles.title}>COVID Contact Notifier</Text>
                    <Text style={styles.text}>A mobile app that helps people (with their consent) be notified if they were in contact with a person that was diagnosed with COVID-19.</Text>
                </View>,
                <View style={styles.innerBtn}>
                    {renderBtn()}
                </View>
            ]}
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
        justifyContent: "flex-end",
    },
    innerCont: {
        flex: 2,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#0E6EB8',
        fontStyle: 'italic'
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

export default Home;
