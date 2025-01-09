// prueba de freyman programacion react native interface de pago 

import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";


const iconpse = require('@/assets/images/pse.png');
const iconbbva = require('@/assets/images/bbva.png');
const iconbancolombia = require('@/assets/images/bancolombia.png');
const iconnequi = require('@/assets/images/nequi.jpg');
const icon = require('@/assets/images/LogoMiFinca.png');

const PaymentMethodsScreen = () => {
  return (
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



