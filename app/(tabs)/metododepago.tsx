import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, Linking, Image, ScrollView } from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "@/components/header/header";
import Constants from "expo-constants";
import { useCarrito } from '@/components/context/carrito/carritocontext';

const API_URL = Constants.expoConfig?.extra?.apiUrlVentas!;

interface Producto {
  productoId: number;
  nombre: string;
  cantidad: number;
  precioUnitario: number;
}

export default function MetodoPago() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { limpiarCarrito } = useCarrito();
  const [productos, setProductos] = useState<Producto[]>([]);
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

  // 🔄 Escucha redirecciones de Wompi una vez montado
  useEffect(() => {
    const handleDeepLink = async ({ url }: { url: string }) => {
      if (url.includes("factura-exitosa")) {
        try {
          const token = await AsyncStorage.getItem("accessToken");
          if (!token) {
            Alert.alert("Error", "No se encontró el token de autenticación");
            return;
          }

          if (productos.length === 0) {
            Alert.alert("Error", "No hay productos para registrar");
            return;
          }

          const venta = { total, productos };

          const response = await fetch(API_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              'USER-MIFINCA-CLIENT': 'mifincaapp-mobile-android',
            },
            body: JSON.stringify(venta),
          });

          if (!response.ok) {
            const errorText = await response.text();
            console.error("❌ Error registrando venta:", errorText);
            Alert.alert("Error", errorText);
            return;
          }

          limpiarCarrito(); // ✅ Limpia contexto
          await AsyncStorage.removeItem("productos_para_pago"); // ✅ Limpia local

          // ✅ Redirigir a factura
          router.push({
            pathname: "/factura",
            params: {
              total: total.toString(),
              productos: JSON.stringify(productos),
            },
          });
        } catch (error) {
          console.error("❌ Error al procesar pago:", error);
          Alert.alert("Error", "Error al guardar la venta.");
        }
      }
    };

    const sub = Linking.addEventListener("url", handleDeepLink);
    return () => sub.remove();
  }, []);

  const handlePagarConWompi = async () => {
    try {
      const urlWompi = `https://checkout.wompi.co/p/?public-key=TU_PUBLIC_KEY&currency=COP&amount-in-cents=${Math.round(
        total * 100
      )}&reference=mi-finca-${Date.now()}&redirect-url=mifincaapp://factura-exitosa`;

      const supported = await Linking.canOpenURL(urlWompi);
      if (supported) {
        Linking.openURL(urlWompi);
      } else {
        Alert.alert("Error", "No se pudo abrir el enlace de pago.");
      }
    } catch (error) {
      console.error("❌ Error al redirigir a Wompi:", error);
      Alert.alert("Error", "No se pudo procesar el pago.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />

      <View style={styles.content}>
        <View style={styles.card}>
          <Image
            source={require("@/assets/images/logos/logo.png")}
            style={styles.logo}
          />

          <Text style={styles.mensaje}>
            ¡Estás a un paso de apoyar a nuestros campesinos! 🌱
          </Text>

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



          <Text style={styles.total}>Total a pagar:</Text>
          <Text style={styles.totalMonto}>${total.toFixed(2)}</Text>

          <TouchableOpacity style={styles.botonPagar} onPress={handlePagarConWompi}>
            <Text style={styles.botonPagarTexto}>Pagar con Wompi</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",

    // 🟢 Sombra sutil pero visible
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8, // Android

    // 🟢 Borde sutil adicional
    borderColor: "#e0e0e0",
    borderWidth: 1,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 15,
  },
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  total: {
    fontSize: 18,
    color: "#333",
  },
  totalMonto: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 30,
  },
  botonPagar: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  botonPagarTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  lineaProducto: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
    borderBottomWidth: 0.5,
    borderColor: "#ddd",
  },
  nombreSimple: {
    fontSize: 16,
    color: "#333",
  },
  cantidadSimple: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
  productosWrapper: {
    width: "100%",
    marginBottom: 15,
  },


});