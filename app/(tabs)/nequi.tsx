import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { useLocalSearchParams, useRouter } from "expo-router";
import Header from "@/components/header/header";
import { Picker } from "@react-native-picker/picker";

const API_URL = Constants.expoConfig?.extra?.apiUrlWompi;

interface Producto {
  productoId: number;
  nombre: string;
  cantidad: number;
  precioUnitario: number;
}

export default function Nequi() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const total = params.total ? parseFloat(params.total as string) : 0;
  const [productos, setProductos] = useState<Producto[]>([]);

  const [form, setForm] = useState({
    nombreCompleto: "",
    tipoDocumento: "CC",
    numeroDocumento: "",
    direccion: "",
    ciudad: "",
    departamento: "",
    correoCliente: "",
    celular: "",
  });

  useEffect(() => {
    const cargarProductos = async () => {
      const productosJSON = await AsyncStorage.getItem("productos_para_pago");
      const guardados = productosJSON ? JSON.parse(productosJSON) : [];
      setProductos(guardados);
    };
    cargarProductos();
  }, []);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handlePagar = async () => {
    const { numeroDocumento, celular, correoCliente } = form;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!numeroDocumento || numeroDocumento.length < 6) {
      Alert.alert("Documento inválido", "El número de documento debe tener al menos 6 dígitos.");
      return;
    }

    if (!celular || celular.length !== 10) {
      Alert.alert("Celular inválido", "El número de celular debe tener 10 dígitos.");
      return;
    }

    if (!emailRegex.test(correoCliente)) {
      Alert.alert("Correo inválido", "Ingresa un correo electrónico válido.");
      return;
    }

    const camposRequeridos = Object.entries(form).filter(
      ([_, v]) => v.trim() === ""
    );
    if (camposRequeridos.length > 0) {
      Alert.alert("Faltan datos", "Por favor completa todos los campos.");
      return;
    }

    try {
      const acceptanceToken = await AsyncStorage.getItem("acceptanceToken");
      const personalToken = await AsyncStorage.getItem("personalToken");
      if (!acceptanceToken || !personalToken) {
        Alert.alert("Error", "No se encontraron los tokens necesarios.");
        return;
      }

      const montoEnCentavos = Math.round(total * 100);
      const body = {
        ...form,
        acceptanceToken,
        personalToken,
        monto_en_centavos: montoEnCentavos,
      };

      const response = await fetch(`${API_URL}/transaccion/nequi`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (!data?.idTransaccion) {
        Alert.alert("Error", "Transacción no iniciada correctamente.");
        return;
      }

      const { idTransaccion } = data;

      // Guardar datos en AsyncStorage para validación posterior
      await AsyncStorage.setItem("idTransaccion", idTransaccion);
      await AsyncStorage.setItem("productos_para_pago", JSON.stringify(productos));
      await AsyncStorage.setItem("cliente", form.nombreCompleto);
      await AsyncStorage.setItem("total_pago", total.toString());

      // Redirigir a pantalla que valida el estado
      router.replace({
        pathname: "/esperandopago",
        params: { t: Date.now().toString() }, // 👈 fuerza recarga
      });

    } catch (error) {
      console.error("❌ Error en pago Nequi:", error);
      Alert.alert("Error", "Ocurrió un error al procesar el pago.");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 10 }}>
      <Header />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Image
            source={require("@/assets/images/logos/logo.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>
            Completa tus datos para pagar con Nequi
          </Text>

          {Object.keys(form).map((key) => {
          if (key === "tipoDocumento") {
            return (
              <View key={key} style={styles.pickerContainer}>
                <Picker
                  selectedValue={form.tipoDocumento}
                  onValueChange={(itemValue) =>
                    handleChange("tipoDocumento", itemValue)
                  }
                  style={styles.picker}
                >
                  <Picker.Item label="CC" value="CC" />
                </Picker>
              </View>
            );
          }

          const isNumericField = key === "numeroDocumento" || key === "celular";
          const isEmailField = key === "correoCliente";

          return (
            <TextInput
              key={key}
              style={styles.input}
              placeholder={key.replace(/([A-Z])/g, " $1").toUpperCase()}
              value={form[key as keyof typeof form]}
              keyboardType={
                isNumericField ? "numeric" : isEmailField ? "email-address" : "default"
              }
              autoCapitalize={isEmailField ? "none" : "sentences"}
              onChangeText={(text) => {
                if (isNumericField) {
                  const soloNumeros = text.replace(/[^0-9]/g, "");
                  handleChange(key as keyof typeof form, soloNumeros);
                } else if (isEmailField) {
                  handleChange(key as keyof typeof form, text.toLowerCase());
                } else {
                  handleChange(key as keyof typeof form, text);
                }
              }}
            />
          );
        })}

          <Text style={styles.totalLabel}>Total a pagar:</Text>
          <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>

          <TouchableOpacity style={styles.boton} onPress={handlePagar}>
            <Text style={styles.botonTexto}>Pagar con Nequi</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
  },
  card: {
    width: "100%",
    backgroundColor: "#f9f9f9",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 50,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    resizeMode: "contain",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  totalLabel: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
    color: "#555",
  },
  totalAmount: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4CAF50",
    textAlign: "center",
    marginBottom: 20,
  },
  boton: {
    backgroundColor: "#000",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  botonTexto: {
    color: "#B9F227",
    fontWeight: "bold",
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  picker: {
    height: 50,
    width: "100%",
  },
});