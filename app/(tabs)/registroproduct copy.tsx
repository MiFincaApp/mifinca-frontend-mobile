import React from "react";
import { View, Text, TextInput,ScrollView, StyleSheet, TouchableOpacity, Image } from "react-native";
import Header from '@/components/header/header';

const RegistroProducto = () => {

  return (

    <ScrollView contentContainerStyle={styles.containern}>
      {/* Header */}
      <Header />

    <View style={styles.container}>
      <Text style={styles.title}>Registro del Producto</Text>

      {/* Formulario */}
      <View style={styles.formContainer}>
        <Text style={styles.label}>Nombre del producto</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite el Nombre del Producto"
          
        />

        <Text style={styles.label}>Precio</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite el Precio"
          keyboardType="numeric"
          
        />

        <Text style={styles.label}>Descripción</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite la Descripción"
          
        />

        <Text style={styles.label}>Cantidad</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite la Cantidad"
          keyboardType="numeric"
       
        />

        {/* Botón de registrar */}
        <TouchableOpacity style={styles.button} >
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>
      </View>

      {/* Logo */}
      <Image source={require("@/assets/images/logos/logo.png")} style={styles.logo2} />
    </View>
    </ScrollView>
  );
};

// Estilos
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  button: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  logo2: {
    width: 120,
    height: 120,
    marginTop: 20,
  },
});

export default RegistroProducto;
