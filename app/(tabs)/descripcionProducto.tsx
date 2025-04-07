import React from "react";
import { StyleSheet, ScrollView, View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';

const icon = require('@/assets/images/icon.png');
const phoneIcon = require('@/assets/images/Telefono.png');
const supportIcon = require('@/assets/images/Soporte.png');
const tomate = require('@/assets/images/tomate.png');
const papa = require('@/assets/images/papa.png');
const yuca = require('@/assets/images/yuca.png');
const zanahoria = require('@/assets/images/zanahoria.png');

const descripcionProducto = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Header */}
            <Header />
            
            {/* Product Details */}
            <View style={styles.productContainer}>
                <Text style={styles.title}>TOMATE PERA</Text>
                <Image source={tomate} style={styles.productImage} />
                <Text style={styles.description}><Text style={styles.bold}>Descripción del producto:</Text> Tomate pera, tu aliado para sopas, sofritos y conservas, cultivado en el municipio del Zulia. Canasta por 15 KG</Text>
                <Text style={styles.detail}><Text style={styles.bold}>Tamaño:</Text> Normal</Text>
                <Text style={styles.detail}><Text style={styles.bold}>Precio por canasta:</Text> $40.000</Text>
                <Text style={styles.detail}><Text style={styles.bold}>Lugar de procedencia:</Text> El Zulia</Text>

                
                {/* Order Section */}
                <View style={styles.orderSection}>
                    <Text style={styles.label}>Cantidad a solicitar</Text>
                    <TextInput style={styles.input} keyboardType="numeric" />
                    <TouchableOpacity style={styles.addToCartButton}><Text style={styles.buttonText}>Agregar al carrito</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.buyNowButton}><Text style={styles.buttonText}>Comprar ahora</Text></TouchableOpacity>
                </View>

                
            </View>
            
            {/* Suggestions */}
            <Text style={styles.suggestionsTitle}>SUGERENCIAS</Text>
            <View style={styles.suggestionsContainer}>
                <View style={styles.suggestionItem}><Image source={papa} style={styles.suggestionImage} /><Text>Papa Bulto $35.000</Text></View>
                <View style={styles.suggestionItem}><Image source={yuca} style={styles.suggestionImage} /><Text>Yuca Bulto $25.000</Text></View>
                <View style={styles.suggestionItem}><Image source={tomate} style={styles.suggestionImage} /><Text>Tomate Bulto $22.500</Text></View>
                <View style={styles.suggestionItem}><Image source={zanahoria} style={styles.suggestionImage} /><Text>Zanahoria Bulto $20.000</Text></View>
            </View>
            
            {/* Footer */}
            <Footer />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#fff",
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 10,
    },
    productContainer: {
        alignItems: "center",
    },
    productImage: {
        width: 200,
        height: 200,
        resizeMode: "contain",
        marginVertical: 10,
    },
    description: {
        textAlign: "center",
        fontSize: 16,
        marginBottom: 5,
    },
    detail: {
        fontSize: 16,
        textAlign: "center",
    },
    bold: {
        fontWeight: "bold",
    },
    orderSection: {
        marginTop: 20,
        alignItems: "center",
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
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
    addToCartButton: {
        backgroundColor: "#dc1431",
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
    },
    buyNowButton: {
        backgroundColor: "#dc1431",
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
        width: "100%",
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    suggestionsTitle: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 20,
    },
    suggestionsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
        marginVertical: 10,
    },
    suggestionItem: {
        alignItems: "center",
        margin: 10,
    },
    suggestionImage: {
        width: 100,
        height: 100,
        resizeMode: "contain",
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
        borderTopWidth: 1,
        borderColor: "#eee",
        marginTop: 20,
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
    supportSection: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
});

export default descripcionProducto;
