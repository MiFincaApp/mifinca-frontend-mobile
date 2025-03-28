import React from "react";
import {StyleSheet, ScrollView, View, Text, Image, TouchableOpacity} from "react-native";

const banner = require('@/assets/images/banner.jpg');
const Astore = require('@/assets/images/appstore.png');
const Gplay = require('@/assets/images/googleplay.png');
const icon = require('@/assets/images/logo.png');

const PaymentMethodsScreen = () => {
    return(
        <ScrollView contentContainerStyle={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Image source={icon} style={styles.logo} />
                <View style={styles.headerRight}>
                    <Text style={styles.headerText}>Obten nuestra app</Text>
                    <Text style={styles.headerText}>Mis pedidos</Text>
                    <Text style={styles.headerText}>Carrito</Text>
                    <Text style={styles.headerText}>Cuenta</Text>
                </View>
            </View>
                {/* Banner */}
                <Image source={banner} style={styles.methodBanner}></Image>
                {/* Title */}
                <Text style={styles.title}>MI FINCA</Text>

                {/*Subtitles*/}
                <Text style={styles.subtitle}>Somos tu mercado campesino online</Text>
                <Text style={styles.subtitle}>Te conectamos con el campo</Text>
                <Text style={styles.subtitle}>Descarga nuestra app</Text>

                {/* Download Button */}
                <View style={styles.mbutton}>
                <TouchableOpacity style={styles.methodButton}>
                    <Image source={Astore} style={styles.methodImage}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={styles.methodButton}>
                    <Image source={Gplay} style={styles.methodImage}></Image>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles= StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#fff",
        padding: 10,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    logo: {
        width: 50,
        height: 50,
        resizeMode: "contain",
    },
    headerRight: {
        flexDirection: "row",
        justifyContent: "space-around",
        flex: 1,
        marginLeft: 20,
    },
    headerText: {
        fontSize: 12,
        color: "#000",
        marginHorizontal: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
        textAlign: "center",
        marginTop: 5,
        color: "#333",
    },
    downloadButton: {
        backgroundColor: "red",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 15,
    },
    downloadButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    mbutton: {
        flexDirection: "row",
        marginTop: 20,
        display: "flex",
        justifyContent: "center",
    },
    methodButton: {
        marginHorizontal: 10,
    },
    methodImage: {
        width: 150,
        height: 50,
        resizeMode: "contain",
    },
    methodBanner: {
        width: "100%",
        height: 200,
        resizeMode: "contain",
        marginTop: 20,
    },
});


export default PaymentMethodsScreen;