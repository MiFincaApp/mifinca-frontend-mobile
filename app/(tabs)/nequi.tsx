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
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { useLocalSearchParams, useRouter } from "expo-router";
import LoadingAnimation from "@/components/screens/Cargando";
import SuccessAnimation from "@/components/screens/SuccessAnimation";
import Header from "@/components/header/header";

const API_URL = Constants.expoConfig?.extra?.apiUrlWompi;
const API_URL_VENTAS = Constants.expoConfig?.extra?.apiUrlVentas;

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
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);

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
      setShowModal(true);

      const timeout = setTimeout(() => {
        clearInterval(interval);
        setShowModal(false);
        router.push({
              pathname: "/factura",
              params: {
                total: total.toString(),
                productos: JSON.stringify(productos),
                cliente: form.nombreCompleto,
                estado: "rechazado",
              },
            });
      }, 15000);

      const interval = setInterval(async () => {
        try {
          const estadoRes = await fetch(
            `${API_URL}/transaccion/${idTransaccion}`
          );
          const estadoData = await estadoRes.json();

          if (estadoData.estado === "APPROVED") {
            clearInterval(interval);
            clearTimeout(timeout); // ✅ Detiene el timeout de 15s
            setSuccess(true);

            setTimeout(async () => {
              const token = await AsyncStorage.getItem("accessToken");
              if (!token) {
                Alert.alert("Error", "Token de autenticación no encontrado");
                return;
              }

              const productosFiltrados = productos.map((p) => ({
                productoId: p.productoId,
                cantidad: p.cantidad,
                precioUnitario: p.precioUnitario,
              }));

              const venta = {
                total,
                productos: productosFiltrados,
              };

              const ventaResponse = await fetch(`${API_URL_VENTAS}`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                  "USER-MIFINCA-CLIENT": "mifincaapp-mobile-android",
                },
                body: JSON.stringify(venta),
              });

              if (!ventaResponse.ok) {
                const errorText = await ventaResponse.text();
                Alert.alert("Error al guardar venta", errorText);
                return;
              }

              await AsyncStorage.removeItem("productos_para_pago");
              setShowModal(false);

              router.push({
                pathname: "/factura",
                params: {
                  total: total.toString(),
                  productos: JSON.stringify(productos),
                  cliente: form.nombreCompleto,
                  estado: "aceptado",
                },
              });
            }, 1500);
          } else if (estadoData.estado === "DECLINED") {
            clearInterval(interval);
            clearTimeout(timeout); // ✅ Detiene el timeout
            setShowModal(false);
            router.push({
              pathname: "/factura",
              params: {
                total: total.toString(),
                productos: JSON.stringify(productos),
                cliente: form.nombreCompleto,
                estado: "rechazado",
              },
            });
          }
        } catch (error) {
          console.error("Error consultando estado:", error);
        }
      }, 5000);
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

          {Object.keys(form).map((key) => (
            <TextInput
              key={key}
              style={styles.input}
              placeholder={key.replace(/([A-Z])/g, " $1").toUpperCase()}
              value={form[key as keyof typeof form]}
              onChangeText={(text) =>
                handleChange(key as keyof typeof form, text)
              }
            />
          ))}

          <Text style={styles.totalLabel}>Total a pagar:</Text>
          <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>

          <TouchableOpacity style={styles.boton} onPress={handlePagar}>
            <Text style={styles.botonTexto}>Pagar con Nequi</Text>
          </TouchableOpacity>
        </View>

        <Modal animationType="fade" transparent visible={showModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {success ? (
                <>
                  <SuccessAnimation />
                  <Text style={styles.modalText}>
                    Pago aprobado y venta registrada
                  </Text>
                </>
              ) : (
                <>
                  <LoadingAnimation />
                  <Text style={styles.modalText}>
                    Confirmando el estado del pago...
                  </Text>
                </>
              )}
            </View>
          </View>
        </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginTop: 20,
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    fontWeight: "600",
  },
});
