import React, { useEffect } from "react"
import { StyleSheet, View, Text } from "react-native"
import AnimatedLoader from "react-native-animated-loader";

const Loading = (props: any) => {

    useEffect(() => {
        setTimeout(function () {
            props.setLoading(false)
        }, 5000)
    }, [])

    return (
        <View style={styles.loading}>
            <AnimatedLoader
                visible={true}
                overlayColor="rgba(255,255,255,0.75)"
                source={require("../assets/loader.json")}
                animationStyle={styles.lottie}
                speed={1}
            />
            {/* <AnimatedLoader
                visible={true}
                overlayColor="rgba(255,255,255,0.75)"
                source={require("../assets/success.json")}
                animationStyle={styles.lottie}
                speed={1}
            /> */}
            <Text style={styles.loadingText}>Loading...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    lottie: {
        width: 100,
        height: 100
    },
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadingText: {
        fontSize: 20,
        color: '#0E6EB8',
        fontWeight: 'bold'
    }
});

export default Loading;
