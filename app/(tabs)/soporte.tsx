import React from "react";
import {StyleSheet, ScrollView, View, Text, Image, TouchableOpacity} from "react-native";

const icon = require('@/assets/images/LogoMiFinca.png');
const iconw = require('@/assets/images/whatsapp.png');

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

            {/* Banner - Logo */}
            <Image source={icon} style={styles.methodBanner}></Image>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.methodButton}>
                    <Text style={styles.methodText}>Chat de arreglo tickets</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.methodButton}>
                    <Text style={styles.methodText}>Chat de usuarios</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.methodButton}>
                    <Text style={styles.methodText}>Preguntas frecuentes</Text>
                </TouchableOpacity>
                {/*  Whatsapp*/}
                <TouchableOpacity style={styles.whatsappButton}>
                    <Image source={iconw} style={styles.whatsappIcon} />
                    <Text style={styles.whatsappText}>Contáctanos Vía WhatsApp</Text>
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
    methodBanner: {
        width: "100%",
        height: 175,
        resizeMode: "contain",
        marginVertical: 20,
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    methodButton: {
        backgroundColor: "#C3002F",
        paddingVertical: 12,
        borderRadius: 8,
        marginVertical: 8,
        alignItems: "center",
    },
    methodText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
    },
    whatsappButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingVertical: 10,
        borderRadius: 8,
        marginTop: 20,
        width: "100%",
        justifyContent: "center",
    },
    whatsappIcon: {
        width: 60,
        height: 60,
        marginRight: 10,
    },
    whatsappText: {
        color: "#333",
        fontSize: 14,
        fontWeight: "bold",
    },
});

export default PaymentMethodsScreen;