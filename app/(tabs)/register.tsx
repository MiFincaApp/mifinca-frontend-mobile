import React, { useState } from "react";
import { StyleSheet, TextInput, Button, View, Image} from "react-native";

//Esta funsion
export default function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Esta funcion maneja el envio del formulario al hacer click
  const handleRegister = () => {
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
      <Button title="Registrar" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 230, // Ajusta el ancho del logo
    height: 230, // Ajusta la altura del logo
    marginBottom: 30, // Espacio entre el logo y el primer campo de entrada
    borderRadius: 115, // borde del logo, ya que es cuadrado.
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
