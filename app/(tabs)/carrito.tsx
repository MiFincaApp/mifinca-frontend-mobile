import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView,FlatList, StyleSheet } from "react-native";
import Header from '@/components/header/header';

const productos = [
  { id: "1", nombre: "Fresa", precio: 7800, imagen: require("@/assets/images/Frutas/fresa.png") },
  { id: "2", nombre: "Aguacate", precio: 7800, imagen: require("@/assets/images/Frutas/aguacate.jpeg") },
  { id: "3", nombre: "Zanahoria", precio: 7800, imagen: require("@/assets/images/Frutas/zanahoria.png") }
];

const CarritoScreen= () => {
  return (

    <ScrollView contentContainerStyle={styles.containern}>
      {/* Header */}
      <Header />

    <View style={styles.container}>
      <Text style={styles.subtotal}>Procede al pago de ({productos.length} productos)</Text>

      <FlatList
        data={productos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Image source={item.imagen} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productText}>{item.nombre} ${item.precio}</Text>
              <Text style={styles.productText}>Envíos gratis</Text>
              <Text style={styles.productText}>Disponible</Text>
              <TouchableOpacity style={styles.saveButton}>
                <Text style={styles.buttonText}>Guardar para más tarde</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton}>
                <Text style={styles.buttonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <View style={styles.totalSection}>
        <Text style={styles.totalTitle}>TOTAL A PAGAR</Text>
        <Text style={styles.totalText}>Precio: ${productos.length * 7800}</Text>
        <Text style={styles.totalText}>Productos: {productos.map(p => p.nombre).join(", ")}</Text>
        <TouchableOpacity style={styles.paymentButton}>
          <Text style={styles.buttonText}>Método de Pago</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    containern: {
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
  container: { 
    flex: 1,
     padding: 20,
      backgroundColor: "#fff" 
    },
  subtotal: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  productCard: { flexDirection: "row", padding: 10, borderWidth: 1, borderColor: "#ccc", marginBottom: 10 },
  productImage: { width: 80, height: 80, marginRight: 10 },
  productInfo: { flex: 1, justifyContent: "center" },
  productText: { fontSize: 16, marginBottom: 2 },
  saveButton: { backgroundColor: "#ffcc00", padding: 5, marginTop: 5, alignItems: "center" },
  deleteButton: { backgroundColor: "red", padding: 5, marginTop: 5, alignItems: "center" },
  totalSection: { padding: 10, borderWidth: 1, borderColor: "#000", marginTop: 10, alignItems: "center" },
  totalTitle: { fontSize: 20, fontWeight: "bold" },
  totalText: { fontSize: 16, marginBottom: 5 },
  paymentButton: { backgroundColor: "red", padding: 10, marginTop: 10 },
  buttonText: { color: "#fff", fontWeight: "bold" }
});

export default CarritoScreen;
