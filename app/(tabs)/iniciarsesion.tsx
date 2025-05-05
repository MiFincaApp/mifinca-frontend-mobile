import React, { useState } from "react";
import { StyleSheet, TextInput, Button, View, Image, Text, ActivityIndicator, Alert } from "react-native";
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.EXPO_PUBLIC_API_URL!;

export default function IniciarSesion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const iniciar = async () => {
    setLoading(true);
    try {
      // 1. POST al login
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error('Credenciales incorrectas');
      }

      // 2. GET del token
      const tokenResponse = await fetch(`${API_URL}/get-token`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${email}`, // Asegúrate de cómo tu API espera este header
        },
      });

      if (!tokenResponse.ok) {
        throw new Error('Error al obtener el token');
      }

      const data = await tokenResponse.json();
      const token = data.token;

      // 3. Guardar token
      await AsyncStorage.setItem('userToken', token);

      // 4. Navegar a la siguiente pantalla
      router.push('/home');
      setEmail("");
      setPassword("");

    } catch (error: any) {
      console.error('Error:', error);
      Alert.alert("Error", error.message || "Hubo un problema al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/logos/LogoMiFinca.png")}
        style={styles.logo}
      />

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" />
      ) : (
        <Button title="Iniciar sesión" onPress={iniciar} />
      )}

      <Text style={styles.account}>¿No tienes cuenta?</Text>
      <Button title="Registrarse" onPress={() => router.push('/register')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 230,
    height: 230,
    marginBottom: 30,
    borderRadius: 115,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: 350
  },
  account:{
    textAlign:"center",
    justifyContent:"center"
  }
});