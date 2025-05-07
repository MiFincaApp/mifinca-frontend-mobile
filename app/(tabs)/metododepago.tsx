import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Header from '@/components/header/header';

const iconpse = require('@/assets/images/Bancos/pse.png');
const iconbbva = require('@/assets/images/Bancos/BBVA-logo.png');
const iconbancolombia = require('@/assets/images/Bancos/bancolombia.png');
const iconnequi = require('@/assets/images/Bancos/nequi.jpg');

const PaymentMethodsScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      {/* Header */}
      <Header />


      {/* Title */}
      <Text style={styles.title}>SELECCIONE SU MÉTODO DE PAGO</Text>

      {/* Payment Methods */}
      <View style={styles.paymentMethods}>
        <TouchableOpacity style={styles.methodButton}>
          <Image source={iconpse}style={styles.methodImage} />
          <Text style={styles.methodText}>Usar método PSE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.methodButton}>
          <Image source={iconbancolombia} style={styles.methodImage} />
          <Text style={styles.methodText}>Usar método Bancolombia</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.methodButton}>
          <Image source={iconnequi} style={styles.methodImage} />
          <Text style={styles.methodText}>Usar método de Nequi</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.methodButton}>
          <Image source={iconbbva} style={styles.methodImage} />
          <Text style={styles.methodText}>Usar método BBVA</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#000",
  },
  paymentMethods: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
  },
  methodButton: {
    width: "40%",
    alignItems: "center",
    marginVertical: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
  },
  methodImage: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  methodText: {
    fontSize: 14,
    color: "#d32f2f",
    textAlign: "center",
    marginTop: 10,
    fontWeight: "bold",
  },
});

export default PaymentMethodsScreen;



//interface de freyman #1