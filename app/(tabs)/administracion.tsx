import React, { useState } from "react";
import { View, Text, TextInput, Image, StyleSheet, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const messages = [
  { sender: "EMPRESA", text: "Hola, ¿en qué podemos ayudarte?" },
  { sender: "USUARIO", text: "Mi producto no llega a casa, quiero reembolso" },
  { sender: "EMPRESA", text: "Enseguida resolvemos su inconveniente" },
];

const ChatScreen = () => {
  const [inputText, setInputText] = useState("");

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.chatContainer}>
        {messages.map((msg, index) => (
          <View key={index} style={styles.chatMessage}>
            <Image source={require("@/assets/images/usuario.png")} style={styles.avatar} />
            <Text style={styles.text}><Text style={styles.sender}>{msg.sender}:</Text> {msg.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escribe tu mensaje"
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton}>
          <Text style={styles.sendText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  chatContainer: {
    padding: 20,
  },
  chatMessage: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 20,
  },
  text: {
    fontSize: 16,
  },
  sender: {
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#dc1431",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  sendText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ChatScreen;
