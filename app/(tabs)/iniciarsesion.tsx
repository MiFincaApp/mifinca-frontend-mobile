import React, { useState } from "react";
import { StyleSheet, TextInput, Button, View, Image} from "react-native";

//Esta funsion
export default function iniciarsesion() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  

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
});
