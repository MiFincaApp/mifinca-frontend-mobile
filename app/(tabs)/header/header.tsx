import React from "react";
import { View, Image, TextInput, StyleSheet } from "react-native";

const icon = require("@/assets/images/logo.png");

const Header: React.FC = () => {
  return (
    <View style={styles.header}>
      <Image source={icon} style={styles.logo} />

      <TextInput
        style={styles.searchBar}
        placeholder="Buscar..."
        placeholderTextColor="#888"
      />

      <View style={styles.headerRight}>
        <Image source={require("@/assets/images/header/nosotros.png")} style={styles.icon} />
        <Image source={require("@/assets/images/header/estadopedido.png")} style={styles.icon} />
        <Image source={require("@/assets/images/header/carrito.png")} style={styles.icon} />
        <Image source={require("@/assets/images/header/cuenta.png")} style={styles.icon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#fff",
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: "#f8f8f8",
    marginHorizontal: 10,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 25,
    height: 25,
    marginHorizontal: 8,
  },
});

export default Header;