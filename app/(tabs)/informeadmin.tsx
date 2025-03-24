import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

const icon = require('@/assets/images/logo.png');

const farmStats = {
  mejor_finca: {
    nombre: "Finca El Paraíso",
    ventas_totales: 2500000,
  },
  menor_finca: {
    nombre: "Finca Vista Hermosa",
    ventas_totales: 800000,
  },
  producto_mas_caro: {
    nombre: "Café Premium El Paraíso",
    precio: 45000,
    finca: "Finca El Paraíso",
  },
  producto_mas_barato: {
    nombre: "Café Tradicional Vista",
    precio: 15000,
    finca: "Finca Vista Hermosa",
  },
  ventas_por_finca: [
    { nombre: "Finca El Paraíso", ventas: 2500000 },
    { nombre: "Finca Los Alpes", ventas: 1800000 },
    { nombre: "Finca Vista Hermosa", ventas: 800000 },
    { nombre: "Finca La Esperanza", ventas: 1500000 },
  ],
};

const InformeAdmin = () => {
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

      <Text style={styles.title}>Estadísticas de Fincas</Text>
      
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Finca con Mayores Ventas</Text>
          <View style={styles.statContent}>
            <Text style={styles.statValue}>{farmStats.mejor_finca.nombre}</Text>
            <Text style={styles.statAmount}>${farmStats.mejor_finca.ventas_totales.toLocaleString()}</Text>
          </View>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Finca con Menores Ventas</Text>
          <View style={styles.statContent}>
            <Text style={styles.statValue}>{farmStats.menor_finca.nombre}</Text>
            <Text style={styles.statAmount}>${farmStats.menor_finca.ventas_totales.toLocaleString()}</Text>
          </View>
        </View>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Producto Más Caro</Text>
          <View style={styles.statContent}>
            <Text style={styles.statValue}>{farmStats.producto_mas_caro.nombre}</Text>
            <Text style={styles.statPrice}>${farmStats.producto_mas_caro.precio.toLocaleString()}</Text>
            <Text style={styles.statSubtitle}>{farmStats.producto_mas_caro.finca}</Text>
          </View>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Producto Más Barato</Text>
          <View style={styles.statContent}>
            <Text style={styles.statValue}>{farmStats.producto_mas_barato.nombre}</Text>
            <Text style={styles.statPrice}>${farmStats.producto_mas_barato.precio.toLocaleString()}</Text>
            <Text style={styles.statSubtitle}>{farmStats.producto_mas_barato.finca}</Text>
          </View>
        </View>
      </View>

      <View style={styles.chartContainerGrafi}>
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Distribución de Ventas por Finca</Text>
          <View style={styles.chartPlaceholder} />
        </View>
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
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: "white",
    width: 300,
    borderRadius: 8,
    padding: 20,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
  },
  statTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  statContent: {
    alignItems: "center", // Cambio importante para evitar errores
  },
  statValue: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  statAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2563eb",
  },
  statPrice: {
    fontSize: 20,
    color: "#059669",
    fontWeight: "bold",
  },
  statSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  chartContainerGrafi: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
  },
  chartContainer: {
    backgroundColor: "white",
    width: "90%",
    borderRadius: 8,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 30,
    alignSelf: "center",
  },
  chartTitle: {
    textAlign: "center",
    fontSize: 20,
    color: "#333",
    marginBottom: 20,
  },
  chartPlaceholder: {
    height: 200,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
});

export default InformeAdmin;
