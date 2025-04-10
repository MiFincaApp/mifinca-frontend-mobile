import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";

export default function RegisterScreen() {
  const [userType, setUserType] = useState("");
  const [docType, setDocType] = useState("");
  const [docNumber, setDocNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    console.log("Datos del usuario:", {
      userType,
      docType,
      docNumber,
      fullName,
      phone,
      email,
      password,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require("@/assets/images/LogoMiFinca.png")}
        style={styles.logo}
      />

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Quien eres:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Campesino, Comprador"
          value={userType}
          onChangeText={setUserType}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Tipo de documento:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Cédula, Pasaporte"
          value={docType}
          onChangeText={setDocType}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>N° del documentación:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese documento"
          value={docNumber}
          onChangeText={setDocNumber}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nombre completo:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese su nombre"
          value={fullName}
          onChangeText={setFullName}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Teléfono:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese su número"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Correo electrónico:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese un correo"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Contraseña:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese una contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    resizeMode: "contain",
  },
  inputGroup: {
    width: "100%",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#000",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 10,
    height: 40,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#c4001d",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
