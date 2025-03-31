import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import Header from '@/components/header/header';

const stats = {
    mas_vendido: {
      nombre: "Café Orgánico",
      cantidad: 1500,
      precio: 25000,
    },
    mas_caro: {
      nombre: "Café Premium",
      cantidad: 5000,
      precio: 45000,
    },
    mas_barato: {
      nombre: "Café Tradicional",
      cantidad: 3000,
      precio: 15000,
    },
    ventas_productos: [
      { nombre: "Café Orgánico", ventas: 1500 },
      { nombre: "Café Premium", ventas: 900 },
      { nombre: "Café Tradicional", ventas: 1200 },
      { nombre: "Café Especial", ventas: 600 },
    ],
  };

const InformeCampesino = () => {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <Header />

        <Text style={styles.title}>Informes de Ventas - Finca El Paraíso</Text>
        <View style={styles.statsGrid}>
            <View style={styles.statCard}>
            <Text style={styles.statTitle}>Producto Más Vendido</Text>
            <Text style={styles.statValue}>{stats.mas_vendido.nombre}</Text>
            <Text style={styles.statDetail}>{stats.mas_vendido.cantidad} unidades</Text>
            <Text style={styles.statPrice}>${stats.mas_vendido.precio.toLocaleString()}</Text>
            </View>

            <View style={styles.statCard}>
            <Text style={styles.statTitle}>Producto Más Caro</Text>
            <Text style={styles.statValue}>{stats.mas_caro.nombre}</Text>
            <Text style={styles.statDetail}>{stats.mas_caro.cantidad} unidades</Text>
            <Text style={styles.statPrice}>${stats.mas_caro.precio.toLocaleString()}</Text>
            </View>

            <View style={styles.statCard}>
            <Text style={styles.statTitle}>Producto Más Barato</Text>
            <Text style={styles.statValue}>{stats.mas_barato.nombre}</Text>
            <Text style={styles.statDetail}>{stats.mas_barato.cantidad} unidades</Text>
            <Text style={styles.statPrice}>${stats.mas_barato.precio.toLocaleString()}</Text>
            </View>
        </View>

        <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Informe de Ventas de los Productos</Text>
            <View style={styles.chartPlaceholder} />
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
      },
      statValue: {
        fontSize: 16,
        color: "#666",
        marginBottom: 5,
      },
      statDetail: {
        fontSize: 14,
        color: "#555",
      },
      statPrice: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#2563eb",
        marginTop: 5,
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
    
export default InformeCampesino;