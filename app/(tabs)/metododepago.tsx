import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useLocalSearchParams } from "expo-router";
import Constants from "expo-constants";
import Header from "@/components/header/header";
import CheckboxSimple from "@/components/ui/CheckboxSimple"; // ✅ importa tu nuevo checkbox

interface Producto {
  productoId: number;
  nombre: string;
  cantidad: number;
  precioUnitario: number;
}

const API_URL = Constants.expoConfig?.extra?.apiUrlWompi;

export default function MetodoPagoNequi() {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [productos, setProductos] = useState<Producto[]>([]);
  const router = useRouter();
  const params = useLocalSearchParams();
  const total = params.total ? parseFloat(params.total as string) : 0;

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const productosJSON = await AsyncStorage.getItem("productos_para_pago");
        const productosGuardados = productosJSON ? JSON.parse(productosJSON) : [];
        setProductos(productosGuardados);
      } catch (error) {
        console.error("❌ Error cargando productos:", error);
      }
    };
    cargarProductos();
  }, []);

  const handleContinuarPago = async () => {
    try {
      const response = await fetch(`${API_URL}/aceptacion`);
      const data = await response.json();

      if (!data.acceptanceToken || !data.personalToken) {
        Alert.alert("Error", "No se pudo obtener el token de aceptación");
        return;
      }

      await AsyncStorage.setItem("acceptanceToken", data.acceptanceToken);
      await AsyncStorage.setItem("personalToken", data.personalToken);

      router.push({
        pathname: "/nequi",
        params: { total: total.toString() },
      });
    } catch (error) {
      console.error("❌ Error al obtener aceptación:", error);
      Alert.alert("Error", "Error al iniciar el flujo de pago.");
    }
  };

  const ambosAceptados = checked1 && checked2;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />
      <View style={styles.content}>
        <View style={styles.card}>
          <Image source={require("@/assets/images/logos/logo.png")} style={styles.logo} />
          <Text style={styles.mensaje}>¡Estás a un paso de apoyar a nuestros campesinos! 🌱</Text>
          <View style={styles.separator} />

          <Text style={styles.title}>Resumen de tu compra</Text>
          {productos.length > 0 ? (
            <View style={styles.productosWrapper}>
              {productos.map((prod, index) => (
                <View key={index} style={styles.lineaProducto}>
                  <Text style={styles.nombreSimple}>{prod.nombre}</Text>
                  <Text style={styles.cantidadSimple}>x{prod.cantidad}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={{ color: "#999", marginBottom: 10 }}>No hay productos</Text>
          )}
          <Text style={styles.total}>Total:</Text>
          <Text style={styles.totalMonto}>${total.toFixed(2)}</Text>

          {/* ✅ Checkboxes bien colocados */}
          <View style={styles.checkboxRow}>
            <CheckboxSimple checked={checked1} onToggle={() => setChecked1(!checked1)} />
            <Text style={styles.texto}>
              Acepto la autorización para la administración de datos personales
            </Text>
          </View>

          <View style={styles.checkboxRow}>
            <CheckboxSimple checked={checked2} onToggle={() => setChecked2(!checked2)} />
            <Text style={styles.texto}>
              Acepto haber leído los reglamentos y la política de privacidad para hacer el pago
            </Text>
          </View>

          {/* ✅ Botón bien ubicado */}
          <TouchableOpacity
            style={[styles.boton, !ambosAceptados && { opacity: 0.5 }]}
            disabled={!ambosAceptados}
            onPress={handleContinuarPago}
          >
            <Text style={styles.botonTexto}>Continuar con tu pago</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: "#fff", padding: 10 },
  content: { padding: 20, marginTop: 20, flex: 1 },
  card: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    borderColor: "#e0e0e0",
    borderWidth: 1,
    marginBottom: 30,
  },
  logo: { width: 100, height: 100, resizeMode: "contain", marginBottom: 15 },
  mensaje: {
    fontSize: 16,
    color: "#4CAF50",
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "600",
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 20,
  },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 8, color: "#333" },
  total: { fontSize: 18, color: "#333" },
  totalMonto: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 30,
  },
  lineaProducto: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
    borderBottomWidth: 0.5,
    borderColor: "#ddd",
  },
  nombreSimple: { fontSize: 16, color: "#333" },
  cantidadSimple: { fontSize: 16, color: "#333", fontWeight: "bold" },
  productosWrapper: { width: "100%", marginBottom: 15 },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 15,
    width: "100%",
    gap: 10,
  },
  texto: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
  boton: {
    backgroundColor: "#000",
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    width: "100%",
  },
  botonTexto: {
    color: "#B9F227",
    fontWeight: "bold",
    fontSize: 16,
  },
});
