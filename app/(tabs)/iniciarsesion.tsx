import React, { useState } from "react";
import { StyleSheet, TextInput, Button, View, Image, Text, ActivityIndicator, Alert, Platform, Modal, Pressable, TouchableOpacity } from "react-native";
import { useRouter } from 'expo-router';
import Constants from 'expo-constants';
import Header from '@/components/header/header';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = Constants.expoConfig?.extra?.apiLoginUrl!;

export default function IniciarSesion() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const handleUserTypeSelection = (tipo: "COMPRADOR" | "CAMPESINO") => {
    setModalVisible(false);
    router.push({ 
      pathname: "/register", 
      params: { tipoUsuario: tipo } 
    });
  };

  const iniciar = async () => {
    setLoading(true);

    try {
      const tipoCliente = Platform.OS === "web" ? "WEB" : "MOVIL";

      const response = await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "USER-MIFINCA-CLIENT": "mifincaapp-mobile-android",
        },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
          tipoCliente,
        }),
      });

      const responseText = await response.text();

      let data;
      try {
        data = JSON.parse(responseText);
      } catch {
        data = null;
      }

      if (!response.ok) {
        // Aquí detectamos error 500 con mensaje específico
        if (
          response.status === 500 &&
          data &&
          data.error ===
            "Ya tienes una sesión activa en este tipo de cliente: MOVIL"
        ) {
          throw new Error(
            "No puedes tener más de dos sesiones móviles activas. Por favor, cierra sesión en otro dispositivo."
          );
        }

        // Para otros errores, mostramos mensaje del backend o genérico
        const mensajeError =
          (data && (data.error || data.mensaje)) || "Credenciales incorrectas";
        throw new Error(mensajeError);
      }

      // Si la respuesta es OK, parseamos tokens
      const accessToken = data?.token;
      const refreshToken = data?.refreshToken;

      if (!accessToken || !refreshToken) {
        throw new Error("No se recibieron los tokens correctamente");
      }

      await AsyncStorage.setItem("accessToken", accessToken);
      await AsyncStorage.setItem("refreshToken", refreshToken);

      router.push("/");

      setUsername("");
      setPassword("");
    } catch (error: any) {
      console.error("Error:", error);
      Alert.alert("Error", error.message || "Hubo un problema al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.formContainer}>
        <Image
          source={require("@/assets/images/logos/LogoMiFinca.png")}
          style={styles.logo}
        />

        <TextInput
          style={styles.input}
          placeholder="Nombre de usuario"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
        />

        {loading ? (
          <ActivityIndicator size="large" color="#4CAF50" />
        ) : (
          <TouchableOpacity style={styles.loginButton} onPress={iniciar}>
            <Text style={styles.loginButtonText}>Iniciar sesión</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.account}>¿No tienes cuenta?</Text>
        
        <TouchableOpacity style={styles.registerButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.registerButtonText}>Registrarse</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>¿Quién quieres ser?</Text>

              <TouchableOpacity
                style={styles.modalButtonPrimary}
                onPress={() => handleUserTypeSelection("COMPRADOR")}
              >
                <Text style={styles.modalButtonText}>COMPRADOR</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalButtonPrimary}
                onPress={() => handleUserTypeSelection("CAMPESINO")}
              >
                <Text style={styles.modalButtonText}>CAMPESINO</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalButtonCancel}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonCancelText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  formContainer: {
    marginTop: 125,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  logo: {
    width: 180,
    height: 180,
    borderRadius: 90,
    resizeMode: "contain",
    marginBottom: 25,
  },
  input: {
    width: "100%",
    maxWidth: 400,
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  account: {
    marginTop: 25,
    fontSize: 16,
    color: "#444",
    textAlign: "center",
  },
  loginButton: {
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
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  registerButton: {
    backgroundColor: "#E8F5E9", // Verde muy claro
    borderColor: "#4CAF50",
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: 200,
    alignItems: "center",
    marginTop: 10,
  },
  registerButtonText: {
    color: "#4CAF50",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 30,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 300,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalButtonPrimary: {
    backgroundColor: "#4CAF50",
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 12,
    width: 200,
    marginVertical: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },

  modalButtonCancel: {
    backgroundColor: "#ddd",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    width: 200,
    marginTop: 18,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },

  modalButtonCancelText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 0.4,
  },
});