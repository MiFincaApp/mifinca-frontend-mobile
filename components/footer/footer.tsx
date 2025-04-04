import React from "react";
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, Pressable } from "react-native";
import { useRouter } from 'expo-router'; // importamos el expo router

const phoneIcon = require('@/assets/images/Telefono.png');
const supportIcon = require('@/assets/images/Soporte.png');

const footer = () => {
    const router = useRouter(); // usamos el router de expo
    return (
        <View style={styles.footer}>
            <TouchableOpacity style={styles.contactInfo}>
                <Image source={phoneIcon} style={styles.footerIcon} />
                <Text>Contáctanos</Text>
            </TouchableOpacity>
            <View style={styles.supportSection}>
                <TextInput style={styles.input} placeholder="Soporte" />
                <Pressable onPress={() => router.push('soporte')}>
                <Image source={supportIcon} style={styles.footerIcon} />
                </Pressable>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
        borderTopWidth: 1,
        borderColor: "#eee",
        marginTop: 20,
    }, contactInfo: {
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
        marginVertical: 10,
    },
    supportSection: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },

});

export default footer;