import React from "react";
import {StyleSheet, ScrollView, View, Text, Image, TouchableOpacity, Pressable} from "react-native";
import Header from '@/components/header/header';
import { useRouter } from 'expo-router'; // importamos el expo router

const icon = require('@/assets/images/LogoMiFinca.png');
const iconw = require('@/assets/images/whatsapp.png');

const soporte = () => {
    const router = useRouter(); // usamos el router de expo

  return(
    <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <Header />

            {/* Banner - Logo */}
            <Image source={icon} style={styles.methodBanner}></Image>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.methodButton}>
                    <Text style={styles.methodText}>Chat de arreglo tickets</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.methodButton} onPress={() => router.push('/administracion')}>
                    <Text style={styles.methodText}>Chat de usuarios</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.methodButton} onPress={() => router.push('/PreguntasFrecuentes')}>
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

export default soporte;