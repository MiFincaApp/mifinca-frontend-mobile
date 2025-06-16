import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Image, Alert, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import Constants from "expo-constants";
import Header from '@/components/header/header';
import { useLocalSearchParams, useRouter } from "expo-router";

const API_URL_CREAR_PRODUCTO = Constants.expoConfig?.extra?.apiUrlProductCreate!;

const RegistroProducto = () => {
  const router = useRouter();
  const { idFinca } = useLocalSearchParams();
  const fincaId = Number(idFinca);

  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [imagen, setImagen] = useState<{ uri: string; name: string; type: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const seleccionarImagen = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      if (!nombre || nombre.trim() === "") {
        Alert.alert("Error", "Primero escribe el nombre del producto antes de seleccionar la imagen");
        return;
      }

      const nombreLimpio = nombre.trim().replace(/\s+/g, "_");
      const fileName = `${nombreLimpio}.webp`;

      const manipResult = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [],
        {
          compress: 0.8,
          format: ImageManipulator.SaveFormat.WEBP,
        }
      );

      setImagen({
        uri: manipResult.uri,
        name: fileName,
        type: "image/webp",
      });
    }
  };

  const registrarProducto = async () => {
    if (!fincaId || isNaN(fincaId)) {
      Alert.alert("Error", "ID de finca inválido");
      return;
    }

    if (!imagen || !nombre || !precio || !descripcion || !cantidad) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    try {
      setSubmitting(true);

      const productoPayload = {
        nombre,
        precio: parseFloat(precio),
        descripcion,
        cantidad: parseInt(cantidad),
      };

      const formData = new FormData();

      formData.append("producto", JSON.stringify(productoPayload));

      formData.append("imagen", {
        uri: imagen.uri,
        name: imagen.name,
        type: imagen.type,
      } as any);

      const response = await fetch(`${API_URL_CREAR_PRODUCTO}/${fincaId}`, {
        method: "POST",
        headers: {
          "USER-MIFINCA-CLIENT": "mifincaapp-mobile-android",
        },
        body: formData,
      });

      if (response.ok) {
        Alert.alert("Éxito", "Producto registrado correctamente");
        router.push("/informes");
        setNombre("");
        setPrecio("");
        setDescripcion("");
        setCantidad("");
        setImagen(null);
      } else {
        const errorText = await response.text();
        Alert.alert("Error", errorText || "Hubo un problema al registrar el producto");
      }
    } catch (error) {
      Alert.alert("Error", "Error de red al registrar el producto");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.containern}>
      <Header />
      <View style={styles.container}>
        <Image source={require("@/assets/images/logos/logo.png")} style={styles.logo2} />

        <Text style={styles.title}>Registro del Producto</Text>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Nombre del producto</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre del Producto"
            value={nombre}
            onChangeText={setNombre}
          />

          <Text style={styles.label}>Precio</Text>
          <TextInput
            style={styles.input}
            placeholder="Precio"
            keyboardType="numeric"
            value={precio}
            onChangeText={setPrecio}
          />
          <Text style={styles.hint}>* Verifique el precio en el boletín del consumidor</Text>

          <Text style={styles.label}>Descripción</Text>
          <TextInput
            style={styles.input}
            placeholder="Descripción"
            value={descripcion}
            onChangeText={setDescripcion}
          />

          <Text style={styles.label}>Cantidad</Text>
          <TextInput
            style={styles.input}
            placeholder="Cantidad"
            keyboardType="numeric"
            value={cantidad}
            onChangeText={setCantidad}
          />

          <TouchableOpacity style={styles.selectButton} onPress={seleccionarImagen}>
            <Text style={styles.selectButtonText}>Seleccionar Imagen</Text>
          </TouchableOpacity>

          {imagen && (
            <Image source={{ uri: imagen.uri }} style={{ width: 200, height: 200, marginVertical: 10 }} />
          )}

          <TouchableOpacity style={styles.registerButton} onPress={registrarProducto} disabled={submitting}>
            {submitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Registrar</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containern: {
    flexGrow: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 10,
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#f9f9f9",
    padding: 18,
    marginBottom: 45,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  label: {
    fontSize: 16, // aumentado
    color: "#555",
    marginTop: 12,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12, // aumentado
    borderRadius: 8,
    marginTop: 6,
    fontSize: 15, // aumentado
    backgroundColor: "#fff",
  },
  selectButton: {
    backgroundColor: "#ddd",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    width: 200,
    marginTop: 18,
    alignItems: "center",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  selectButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 0.4,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 20,
    alignItems: "center",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  registerButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 12,
    width: 200,
    marginVertical: 10,
    alignItems: "center",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  logo2: {
    width: 110,
    height: 80,
    marginVertical: 10,
    resizeMode: "contain",
  },
  hint: {
    fontSize: 13,
    color: "#888",
    marginTop: 5,
    fontStyle: "italic",
  },
});

export default RegistroProducto;