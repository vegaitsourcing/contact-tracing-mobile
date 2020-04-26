import React from 'react';
import { View, Text, TouchableHighlight, Modal, StyleSheet, Dimensions, Linking } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const { width: WIDTH } = Dimensions.get('window')


const ModalPopup = (props: any) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.visible}
            onRequestClose={() => { props.setVisible(false) }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>WARNING!</Text>
                    <Text style={styles.modalText}>
                        You have been near infected person! {"\n"}
                        Please contact the official health authority of your area and follow the instructions provided. {"\n"}
                        Follow <Text style={{color: "#0000FF"}} onPress={() => Linking.openURL('https://www.who.int/news-room/q-a-detail/q-a-coronaviruses')}>this link</Text> to get more details about the diesase.
                    </Text>
                    <TouchableHighlight
                        style={styles.openButton}
                        onPress={() => {
                            props.setVisible(false);
                        }}
                    >
                        <Text style={styles.textStyle}>GOT IT!</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        width: WIDTH - 55,
        height: 380,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        justifyContent: "space-between",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#0E6EB8",
        borderWidth: 1,
        borderColor: '#0E6EB8',
        borderRadius: 50,
        height: 50,
        width: WIDTH - 200,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    },
    modalTitle: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 30,
        color: "#ff0000"
    },
    modalText: {
        textAlign: "center",
        fontSize: 20,
    }
});

export default ModalPopup;