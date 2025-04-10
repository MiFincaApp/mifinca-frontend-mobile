import { useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, TextInput, Button, View, Image, Text } from "react-native";
import { useRouter } from 'expo-router';

//Esta funsion
export default function iniciarsesion() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // usamos el router de expo


  //Esta funcion maneja el envio del formulario al hacer click
  const iniciar = () => {
    console.log("Usuario registrado", { username, email, password });
    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/LogoMiFinca.png")}

        style={styles.logo}
      />

      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo electronico"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Iniciar sesión" onPress={iniciar} />

      <View>
        <Text style={styles.account}> No tienes cuenta?</Text>
      </View>
      <Button title="Registrarse" onPress={() => router.push('/register')}/>
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
