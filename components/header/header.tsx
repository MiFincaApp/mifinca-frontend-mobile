import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const icon = require("@/assets/images/logo.png");

const Header = () => {
  return (
    <View style={styles.header}>
      <Image source={icon} style={styles.logo} />
      <View style={styles.headerRight}>
        <Text style={styles.headerText}>Obten nuestra app</Text>
        <Text style={styles.headerText}>Mis pedidos</Text>
        <Text style={styles.headerText}>Carrito</Text>
        <Text style={styles.headerText}>Cuenta</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    flexWrap: "wrap", // Permite que los elementos pasen a la siguiente línea si no caben
    justifyContent: "flex-end", // Alinea los elementos a la derecha sin separarlos demasiado
    flexShrink: 1, // Evita que el contenedor crezca más de lo necesario
  },
  
  headerText: {
    fontSize: 12,
    color: "#000",
    marginHorizontal: 5, // Reduce el espacio horizontal
    flexShrink: 1, // Evita que el texto se salga de la pantalla
  },
});

export default Header;


//Se creo un componente header para optimizar el codigo de la app