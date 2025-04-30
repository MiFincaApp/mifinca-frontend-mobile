import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet,ScrollView, TouchableOpacity, Image } from "react-native";
import Header from '@/components/header/header';
import DateTimePicker from "@react-native-community/datetimepicker";


const SolicitarCita = () => {
  // Estados del formulario
  const [lugar, setLugar] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [fecha, setFecha] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  // Manejar el cambio de fecha
  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      setFecha(selectedDate);
    }
  };

  // Manejar el envío del formulario
  const handleSubmit = () => {
    console.log("Solicitud enviada:", { lugar, cantidad, fecha });
  };

  return (
<ScrollView contentContainerStyle={styles.containern}>
      {/* Header */}
      <Header />

    <View style={styles.container}>
      <Text style={styles.title}>SOLICITAR CITA</Text>

      <View style={styles.formContainer}>
        {/* Campo Lugar */}
        <Text style={styles.label}>Lugar de entrega</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite lugar de Entrega"
          value={lugar}
          onChangeText={setLugar}
        />

        {/* Campo Cantidad */}
        <Text style={styles.label}>Cantidad</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite la Cantidad"
          keyboardType="numeric"
          value={cantidad}
          onChangeText={setCantidad}
        />

        {/* Campo Fecha */}
        <Text style={styles.label}>Fecha</Text>
        <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.input}>
          <Text>{fecha.toLocaleDateString()}</Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={fecha}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}

        {/* Botón de Solicitar */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Solicitar</Text>
        </TouchableOpacity>
      </View>

      {/* Logo */}
      <Image source={require("@/assets/images/logo.png")} style={styles.logo2} />
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

export default SolicitarCita;
