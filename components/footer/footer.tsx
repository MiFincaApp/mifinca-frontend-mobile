import React from "react";
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, Pressable } from "react-native";
import { useRouter } from 'expo-router';

const phoneIcon = require('@/assets/images/Telefono.png');
const supportIcon = require('@/assets/images/Soporte.png');

const Footer: React.FC = () => {
    const router = useRouter();

    return (
        <View style={styles.footer}>
            <TouchableOpacity style={styles.contactInfo}>
                <Image source={phoneIcon} style={styles.footerIcon} />
                <Text>Contáctanos</Text>
            </TouchableOpacity>

            <View style={styles.supportSection}>
                <TextInput style={styles.input} placeholder="Soporte" />
                <Pressable onPress={() => router.push('/soporte')}>
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
});

export default Footer;