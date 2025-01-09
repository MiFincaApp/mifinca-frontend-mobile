import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

const icon = require('@/assets/images/LogoMiFinca.png');
const banner = require('@/assets/images/banner.jpg');

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

      {/* Banner */}
      <Image source={banner} style={styles.banner} />

      {/* Catálogo */}
      <View style={styles.catalogo}>
        {/* Fila 1 */}
        <View style={styles.row}>
          <View style={styles.producto}>
            <Image source={banner} style={styles.imagen} />
            <Text style={styles.nombre}>Papa</Text>
            <Text style={styles.precio}>Bulto $35.000</Text>
          </View>
          <View style={styles.producto}>
            <Image source={banner} style={styles.imagen} />
            <Text style={styles.nombre}>Papaya</Text>
            <Text style={styles.precio}>Canasta $12.000</Text>
          </View>
          <View style={styles.producto}>
            <Image source={banner} style={styles.imagen} />
            <Text style={styles.nombre}>Yuca</Text>
            <Text style={styles.precio}>Bulto $25.000</Text>
          </View>
        </View>

        {/* Fila 2 */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.producto}>
            <Image source={banner} style={styles.imagen} />
            <Text style={styles.nombre}>Aguacate</Text>
            <Text style={styles.precio}>Docena $15.000</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.producto}>
            <Image source={banner} style={styles.imagen} />
            <Text style={styles.nombre}>Tomate</Text>
            <Text style={styles.precio}>Bulto $22.500</Text>
          </TouchableOpacity>
          <View style={styles.producto}>
            <Image source={banner} style={styles.imagen} />
            <Text style={styles.nombre}>Zanahoria</Text>
            <Text style={styles.precio}>Bulto $20.000</Text>
          </View>
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
  banner: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 20,
  },
  catalogo: {
    marginTop: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  producto: {
    alignItems: "center",
    width: 100,
  },
  imagen: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginBottom: 5,
  },
  nombre: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  precio: {
    fontSize: 12,
    textAlign: "center",
    color: "#666",
  },
});

export default PaymentMethodsScreen;
