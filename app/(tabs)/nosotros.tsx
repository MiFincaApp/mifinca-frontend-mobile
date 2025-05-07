import React from "react";
import {StyleSheet, ScrollView, View, Text, Image, TouchableOpacity} from "react-native";
import Header from '@/components/header/header';

const banner = require('@/assets/images/campo.jpg');
const Astore = require('@/assets/images/Redes Sociales/appstore.png');
const Gplay = require('@/assets/images/Redes Sociales/googleplay.png');


const nosotros = () => {
    return(
        <ScrollView contentContainerStyle={styles.container}>
            {/* Header */}
            <Header />


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


export default nosotros;