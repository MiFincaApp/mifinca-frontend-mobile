import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import Header from "./header/header";

const userProfile = {
  nombre: "Juan Cardenas",
  correo: "juan.cardenas@example.com",
  rol: "Cliente",
};

const Perfil = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      {/* Header */}
      <View>
        <Header />
      </View>

      {/* Perfil */}
      <View style={styles.profileContainer}>
        <Text style={styles.title}>Perfil</Text>
        <View style={styles.profileInfo}>
          <Text style={styles.label}>Nombre:</Text>
          <Text style={styles.value}>{userProfile.nombre}</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.label}>Correo:</Text>
          <Text style={styles.value}>{userProfile.correo}</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.label}>Rol:</Text>
          <Text style={styles.value}>{userProfile.rol}</Text>
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
  profileContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  profileInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666",
  },
  value: {
    fontSize: 16,
    color: "#333",
  },
});

export default Perfil;