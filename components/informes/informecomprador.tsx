import { View, Text, FlatList, Dimensions, StyleSheet, Modal } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { useEffect, useState } from "react";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ErrorAnimation from "@/components/screens/Error";

// 🔹 Interfaz de los datos del informe del comprador
interface InformeCompra {
  id: number;
  productoId: number;
  nombreProducto: string;
  cantidad: number;
  precioTotal: number;
  compradorId: number;
  vendedorId: number;
  fechaCompra: string;
}

const API_URL_COMPRADOR = Constants.expoConfig?.extra?.apiUrlInformeComprador!;

export default function InformesComprador() {
  const [datosAgrupados, setDatosAgrupados] = useState<InformeCompra[]>([]);
  const [datosCargados, setDatosCargados] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        if (!token) {
          setMensajeError("Token no encontrado");
          setErrorVisible(true);
          setTimeout(() => setErrorVisible(false), 3000);
          return;
        }

        const response = await fetch(`${API_URL_COMPRADOR}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "USER-MIFINCA-CLIENT": "mifincaapp-mobile-android",
          },
        });

        const contentType = response.headers.get("Content-Type");

        if (response.ok) {
          if (contentType?.includes("application/json")) {
            const data = await response.json();

            if (Array.isArray(data)) {
              const agrupados: { [key: string]: InformeCompra } = {};
              data.forEach((item) => {
                if (agrupados[item.nombreProducto]) {
                  agrupados[item.nombreProducto].cantidad += item.cantidad;
                  agrupados[item.nombreProducto].precioTotal += item.precioTotal;
                } else {
                  agrupados[item.nombreProducto] = { ...item };
                }
              });

              setDatosAgrupados(Object.values(agrupados));
            } else {
              setDatosAgrupados([]);
            }
          } else {
            const texto = await response.text();
            if (texto.includes("No has realizado ninguna compra")) {
              setDatosAgrupados([]);
            } else {
              setMensajeError("Respuesta inesperada del servidor");
              setErrorVisible(true);
              setTimeout(() => setErrorVisible(false), 3000);
            }
          }
        } else {
          const errorText = await response.text();
          setMensajeError("Error al obtener informe: " + errorText);
          setErrorVisible(true);
          setTimeout(() => setErrorVisible(false), 3000);
        }
      } catch (error: any) {
        setMensajeError("Error de red: " + error.message);
        setErrorVisible(true);
        setTimeout(() => setErrorVisible(false), 3000);
      } finally {
        setDatosCargados(true);
      }
    };

    obtenerDatos();
  }, []);

  // 🎨 Colores para el gráfico
  const colores = ["#4CAF50", "#81C784", "#66BB6A", "#388E3C", "#2E7D32", "#1B5E20", "#AED581", "#A5D6A7"];

  // 🟢 Formato para PieChart
  const datosPie = datosAgrupados.map((item, index) => ({
    name: item.nombreProducto,
    quantity: item.cantidad,
    color: colores[index % colores.length],
    legendFontColor: "#333",
    legendFontSize: 12,
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Informes de Compras</Text>

      {/* Gráfico circular */}
      {datosAgrupados.length > 0 ? (
        <PieChart
          data={datosPie}
          width={Dimensions.get("window").width - 20}
          height={220}
          chartConfig={{
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="quantity"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      ) : (
        <View style={styles.graficoVacio}>
          <View style={styles.circuloVacio} />
          <Text style={styles.textoVacio}>Sin datos para mostrar</Text>
        </View>
      )
    }


      {/* Tabla */}
      <View style={{ marginTop: 20 }}>
        <Text style={styles.subtitulo}>Detalle de Compras:</Text>
        <View style={styles.headerRow}>
          <Text style={[styles.headerCell, { flex: 2 }]}>Producto</Text>
          <Text style={[styles.headerCell, { flex: 1 }]}>Cantidad</Text>
          <Text style={[styles.headerCell, { flex: 1 }]}>Total</Text>
        </View>

        <FlatList
          data={
            datosAgrupados.length === 0 && datosCargados
              ? [{
                  id: 0,
                  productoId: 0,
                  nombreProducto: "Sin productos",
                  cantidad: 0,
                  precioTotal: 0,
                  compradorId: 0,
                  vendedorId: 0,
                  fechaCompra: "",
                }]
              : datosAgrupados
          }
          keyExtractor={(item) => item.nombreProducto + item.id}
          renderItem={({ item }) => (
            <View style={styles.dataRow}>
              <Text style={[styles.dataCell, { flex: 2 }]}>{item.nombreProducto}</Text>
              <Text style={[styles.dataCell, { flex: 1 }]}>{item.cantidad}</Text>
              <Text style={[styles.dataCell, { flex: 1 }]}>${item.precioTotal.toFixed(2)}</Text>
            </View>
          )}
        />
      </View>

      {/* Modal de Error */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={errorVisible}
        onRequestClose={() => setErrorVisible(false)}
      >
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <ErrorAnimation />
            <Text style={modalStyles.successText}>{mensajeError}</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  titulo: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },
  subtitulo: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  headerRow: {
    flexDirection: "row",
    paddingVertical: 6,
    borderBottomWidth: 2,
    borderColor: "#4CAF50",
    backgroundColor: "#E8F5E9",
  },
  headerCell: {
    fontWeight: "bold",
    textAlign: "center",
  },
  dataRow: {
    flexDirection: "row",
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  dataCell: {
    textAlign: "center",
  },
  graficoVacio: {
    height: 220,
    width: Dimensions.get("window").width - 20,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
  },
  circuloVacio: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 3,
    borderColor: "#4CAF50",
    backgroundColor: "#fff",
  },

  textoVacio: {
    marginTop: 12,
    fontSize: 16,
    color: "#4CAF50",
    fontWeight: "600",
  },

});

const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "80%",
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
  successText: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
