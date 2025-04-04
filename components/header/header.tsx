import React from "react";
import { View, Text, Image, StyleSheet, Pressable, } from "react-native";
import { useRouter } from 'expo-router'; // importamos el expo router

const icon = require("@/assets/images/logo.png");

const header = () => {
  const router = useRouter(); // usamos el router de expo
  return (
    <View style={styles.header}>

      <Pressable onPress={() => router.push('/')}>
        <Image source={icon} style={styles.logo} />
      </Pressable>

      <View style={styles.headerRight}>
        <Pressable onPress={() => router.push('/nosotros')}>
          <Text style={styles.headerText}>Obten nuestra app</Text>
        </Pressable>
        <Pressable onPress={() => router.push('/estadopedido')}>
          <Text style={styles.headerText}>Mis pedidos</Text>
        </Pressable>
        <Text style={styles.headerText}>Carrito</Text>
        <Pressable onPress={() => router.push('/Perfil')}>
          <Text style={styles.headerText}>Cuenta</Text>
        </Pressable>
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
  searchBar: {
    flex: 1,
    marginLeft: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
});

export default header;


//Se creo un componente header para optimizar el codigo de la app