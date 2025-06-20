import React from "react";
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, Pressable, Linking } from "react-native";
import { useRouter } from 'expo-router';

const phoneIcon = require('@/assets/images/Footer/Telefono.png');
const supportIcon = require('@/assets/images/Footer/Soporte.png');

const Footer: React.FC = () => {
    const router = useRouter();

    const handleWhatsAppContact = () => {
        Linking.openURL("http://wa.me/+573209001661");
    };

    const handleGoToSupport = () => {
        router.push('/soporte');
    };

    return (
        <View style={styles.footer}>
            <TouchableOpacity style={styles.contactInfo} onPress={handleWhatsAppContact}>
                <Image source={phoneIcon} style={styles.footerIcon} />
                <Text>Contáctanos</Text>
            </TouchableOpacity>

            <View style={styles.supportSection}>
                <Pressable style={styles.supportButton} onPress={handleGoToSupport}>
                    <Text style={styles.supportText}>¿Necesitas Ayuda?</Text>
                    <Image source={supportIcon} style={styles.footerIcon} />
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderColor: "#eee",
        zIndex: 10,
    },
    contactInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    footerIcon: {
        width: 24,
        height: 24,
        resizeMode: "contain",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 5,
        width: 100,
        textAlign: "center",
    },
    supportSection: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    supportButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5, // espacio entre ícono y texto
    },
    supportText: {
        fontSize: 14,
        color: "#333",
    },

});

export default Footer;