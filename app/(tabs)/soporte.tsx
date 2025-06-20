import React from "react";
import { StyleSheet, ScrollView, View, Text, Image, TouchableOpacity, Linking } from "react-native";
import Header from '@/components/header/header';
import { useRouter } from 'expo-router';

const icon = require('@/assets/images/logos/LogoMiFinca.png');
const iconw = require('@/assets/images/Redes Sociales/whatsapp.png');

const Soporte = () => {
    const router = useRouter();

    const handleWhatsAppContact = () => {
        Linking.openURL("http://wa.me/+573209001661");
    };

    return (
        <View style={styles.container}>
            {/* Header fijo arriba */}
            <Header />

            {/* Contenido centrado */}
            <ScrollView contentContainerStyle={styles.content}>
                <Image source={icon} style={styles.methodBanner} />

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.methodButton}
                        onPress={() => router.push('/PreguntasFrecuentes')}
                    >
                        <Text style={styles.methodText}>Preguntas frecuentes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.whatsappButton} onPress={handleWhatsAppContact}>
                        <Image source={iconw} style={styles.whatsappIcon} />
                        <Text style={styles.whatsappText}>Contáctanos vía WhatsApp</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 10,
    },
    content: {
        flexGrow: 1,
        justifyContent: "flex-start", // Ya no centramos verticalmente
        alignItems: "center",
        paddingTop: 160, // Eleva el contenido visualmente
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    methodBanner: {
        width: 220,
        height: 160,
        resizeMode: "contain",
        marginBottom: 32,
    },
    buttonContainer: {
        width: "100%",
        alignItems: "center",
        gap: 20,
    },
    methodButton: {
        backgroundColor: "#4CAF50",
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 12,
        alignItems: "center",
        width: "100%",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    methodText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    whatsappButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f1f1f1",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        width: "100%",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    whatsappIcon: {
        width: 40,
        height: 40,
        marginRight: 12,
    },
    whatsappText: {
        color: "#333",
        fontSize: 15,
        fontWeight: "bold",
    },
});


export default Soporte;