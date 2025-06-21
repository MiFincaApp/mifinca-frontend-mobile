import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Alert,
  AppState,
  AppStateStatus,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { useRouter, useFocusEffect, useLocalSearchParams } from "expo-router";
import Header from "@/components/header/header";
import LoadingAnimation from "@/components/screens/Cargando";
import SuccessAnimation from "@/components/screens/SuccessAnimation";
import ErrorAnimation from "@/components/screens/Error";

const API_URL = Constants.expoConfig?.extra?.apiUrlWompi;
const API_URL_VENTAS = Constants.expoConfig?.extra?.apiUrlVentas;

export default function EsperandoPago() {
  const router = useRouter();
  const { recarga } = useLocalSearchParams();
  const [success, setSuccess] = useState(false);
  const [declined, setDeclined] = useState(false);

  const verificarEstado = useCallback(async () => {

    const idTransaccion = await AsyncStorage.getItem("idTransaccion");
    const productosJSON = await AsyncStorage.getItem("productos_para_pago");
    const cliente = await AsyncStorage.getItem("cliente");
    const totalStr = await AsyncStorage.getItem("total_pago");
    const total = totalStr ? parseFloat(totalStr) : 0;
    const productos = productosJSON ? JSON.parse(productosJSON) : [];

    if (!idTransaccion || !cliente) {
      Alert.alert("Error", "Faltan datos para verificar el estado del pago.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/transaccion/${idTransaccion}`);
      const data = await res.json();

      if (data.estado === "APPROVED") {
        setSuccess(true);

        const token = await AsyncStorage.getItem("accessToken");
        if (!token) {
          Alert.alert("Error", "Token no encontrado");
          return;
        }

        const productosFiltrados = productos.map((p: any) => ({
          productoId: p.productoId,
          cantidad: p.cantidad,
          precioUnitario: p.precioUnitario,
        }));

        const venta = { total, productos: productosFiltrados };

        const ventaRes = await fetch(`${API_URL_VENTAS}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "USER-MIFINCA-CLIENT": "mifincaapp-mobile-android",
          },
          body: JSON.stringify(venta),
        });

        if (!ventaRes.ok) {
          const error = await ventaRes.text();
          Alert.alert("Error al guardar venta", error);
          return;
        }

        await AsyncStorage.multiRemove([
          "productos_para_pago",
          "idTransaccion",
          "cliente_para_pago",
          "total_pago",
        ]);

        setTimeout(() => {
          router.replace({
            pathname: "/factura",
            params: {
              total: total.toString(),
              productos: JSON.stringify(productos),
              cliente,
              estado: "aceptado",
            },
          });
        }, 2000);
      } else if (data.estado === "DECLINED") {
        setDeclined(true);
        setTimeout(() => {
          router.replace({
            pathname: "/factura",
            params: {
              total: total.toString(),
              productos: JSON.stringify(productos),
              cliente,
              estado: "rechazado",
            },
          });
        }, 3000);
      } else {
        setTimeout(verificarEstado, 5000);
      }
    } catch (error) {
      console.log("❌ Error al verificar estado:", error);
      setTimeout(verificarEstado, 5000);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      verificarEstado();
    }, [recarga])
  );

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState: AppStateStatus) => {
      if (nextAppState === "active") {
        verificarEstado();
      }
    });

    return () => {
      subscription.remove();
    };
  }, [verificarEstado]);

  return (
    <View style={styles.container}>
      <Header />
      <Modal transparent animationType="fade" visible>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {success ? (
              <>
                <SuccessAnimation />
                <Text style={styles.modalText}>Pago aprobado</Text>
              </>
            ) : declined ? (
              <>
                <ErrorAnimation />
                <Text style={styles.modalText}>Pago rechazado</Text>
              </>
            ) : (
              <>
                <LoadingAnimation />
                <Text style={styles.modalText}>Esperando confirmación de Nequi...</Text>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: '80%',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: "bold",
  },
});