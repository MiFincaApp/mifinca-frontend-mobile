import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView, Alert, Modal, Platform } from "react-native";
import { useRouter, useLocalSearchParams } from 'expo-router';
import Header from "@/components/header/header";
import Constants from "expo-constants";
import SuccessAnimation from "@/components/screens/SuccessAnimation";

import ErrorAnimation from "@/components/screens/Error";

const API_URL = Constants.expoConfig?.extra?.apiRegisterUrl!;

export default function register() {
  const router = useRouter();
  const { tipoUsuario: tipoUsuarioParam } = useLocalSearchParams<{ tipoUsuario: "CAMPESINO" | "COMPRADOR" }>();

  const [nombre, setNombre] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  const [showSuccessModal, setShowSuccessModal] = useState(false);  // Estado modal


  const tipoUsuario = (tipoUsuarioParam || "") as "CAMPESINO" | "COMPRADOR" | "";
  

  const handleRegister = async () => {
    if (!nombre || !username || !email || !password) {
      Alert.alert("Error", "Por favor completa todos los campos.");
      return;
    }

    const payload: any = {
      nombre,
      username,
      password,
      email,
      tipoUsuario,
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "USER-MIFINCA-CLIENT": "mifincaapp-mobile-android",
        },
        body: JSON.stringify(payload),
      });

      const contentType = response.headers.get("Content-Type");

      // Leer la respuesta como texto crudo
      const rawText = await response.text();
      let jsonData: any = null;

      // Intentar parsear si el Content-Type indica que es JSON
      if (contentType && contentType.includes("application/json")) {
        try {
          jsonData = JSON.parse(rawText);
        } catch (jsonError) {
          console.error("Error parseando JSON:", jsonError);
          setErrorMessage("La respuesta del servidor no es un JSON válido.");
          setShowErrorModal(true);
          setTimeout(() => setShowErrorModal(false), 3000);
          return;
        }
      }

      if (response.ok) {
        console.log("Usuario registrado:", jsonData || rawText);

        // Mostrar modal éxito
        setShowSuccessModal(true);

        // Limpiar campos
        setNombre("");
        setUsername("");
        setEmail("");
        setPassword("");

        // Cerrar modal y redirigir tras 3 segundos
        setTimeout(() => {
          setShowSuccessModal(false);
          router.replace("/iniciarsesion");
        }, 3000);

      } else {
        const message =
          (jsonData && jsonData.message) ||
          rawText ||
          "No se pudo registrar";

        console.error("Error al registrar:", message);
        setErrorMessage(message);
        setShowErrorModal(true);
        setTimeout(() => setShowErrorModal(false), 3000);
      }
    } catch (error) {
      console.error("Error de red:", error);
      setErrorMessage("Error de red. Intente nuevamente más tarde.");
      setShowErrorModal(true);
      setTimeout(() => setShowErrorModal(false), 3000);
    }
  };

    return (
      <>
        <ScrollView contentContainerStyle={styles.container}>
          <Header />

          <Image
            source={require("@/assets/images/logos/LogoMiFinca.png")}
            style={styles.logo}
          />

          <Text style={styles.title}>
            {tipoUsuario === "CAMPESINO" ? "Registro de CAMPESINO" : "Registro de Comprador"}
          </Text>

          <View style={styles.formWrapper}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nombre completo:</Text>
              <TextInput
                style={styles.input}
                placeholder="Ingrese su nombre"
                value={nombre}
                onChangeText={setNombre}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nombre de usuario:</Text>
              <TextInput
                style={styles.input}
                placeholder="Ingrese un nombre de usuario"
                value={username}
                onChangeText={setUsername}
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
          </View>

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Modal de éxito */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={showSuccessModal}
          onRequestClose={() => setShowSuccessModal(false)}
        >
          <View style={modalStyles.centeredView}>
            <View style={modalStyles.modalView}>
                <SuccessAnimation />
            </View>
          </View>
        </Modal>

        {/* Modal de error */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={showErrorModal}
          onRequestClose={() => setShowErrorModal(false)}
        >
          <View style={modalStyles.centeredView}>
            <View style={modalStyles.modalView}>
              <ErrorAnimation />
              <Text style={modalStyles.successText}>{errorMessage}</Text>
            </View>
          </View>
        </Modal>

      </>
    );
  }

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    alignItems: "center",
    backgroundColor: "#ffffff",
  },

  logo: {
    width: 160,
    height: 160,
    marginTop: 30,
    marginBottom: 10,
    resizeMode: "contain",
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#222",
    marginBottom: 25,
    textAlign: "center",
    letterSpacing: 0.5,
  },

  formWrapper: {
    width: "100%",
    maxWidth: 400,
  },

  inputGroup: {
    marginBottom: 18,
  },

  label: {
    fontSize: 15,
    color: "#333",
    marginBottom: 6,
    fontWeight: "500",
  },

  input: {
    height: 48,
    backgroundColor: "#f9f9f9",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 15,
    color: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  // Estilos del boton de registro
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: 200,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});

const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo negro semitransparente
  },
  modalView: {
    width: '80%', // o usa '80%' si quieres que se adapte a diferentes pantallas
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  successText: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: "bold",
  },
});