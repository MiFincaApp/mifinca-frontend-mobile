import React from "react";
import {StyleSheet, ScrollView, View, Text, Image, TouchableOpacity} from "react-native";

const icon = require('@/assets/images/logo.png')
const user = require('@/assets/images/usuario.png')

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
            {/* Main */}
            <ScrollView style={styles.main}>
                <TouchableOpacity style={styles.methodButton}>
                    <Image source={user} style={styles.profilePic} />
                    <Text style={styles.mainText}>Usuario 1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.methodButton}>
                    <Image source={user} style={styles.profilePic} />
                    <Text style={styles.mainText}>Usuario 2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.methodButton}>
                    <Image source={user} style={styles.profilePic} />
                    <Text style={styles.mainText}>Usuario 3</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.methodButton}>
                    <Image source={user} style={styles.profilePic} />
                    <Text style={styles.mainText}>Usuario 4</Text>
                </TouchableOpacity>
            </ScrollView>
        </ScrollView>
    );
};

const styles=StyleSheet.create({
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
    main: {
        flexDirection: "column", 
        gap: 10, 
    },
    methodButton: {
        flexDirection: "row", 
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
    },
    profilePic: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    mainText: {
        fontSize: 16,
    },
})

export default PaymentMethodsScreen;    