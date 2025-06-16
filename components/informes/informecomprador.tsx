import { View, Text, FlatList, Dimensions, StyleSheet } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { useEffect, useState } from "react";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const [datos, setDatos] = useState<InformeCompra[]>([]);
  const [datosCargados, setDatosCargados] = useState(false);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        if (!token) {
          console.error("Token no encontrado");
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

        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            setDatos(data);
          } else {
            setDatos([]);
          }
        } else {
          console.error("Error al obtener informe:", await response.text());
        }
      } catch (error) {
        console.error("Error de red:", error);
      } finally {
        setDatosCargados(true);
      }
    };

    obtenerDatos();
  }, []);

  const labels = datos.map((d) => d.nombreProducto);
  const cantidades = datos.map((d) => d.cantidad);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Informes de Compras</Text>

      {/* Mostrar gráfico solo si hay datos */}
      {datos.length > 0 && (
        <BarChart
          data={{
            labels,
            datasets: [{ data: cantidades }],
          }}
          width={Dimensions.get("window").width - 20}
          height={220}
          yAxisLabel=""
          yAxisSuffix=" u."
          fromZero
          chartConfig={{
            backgroundColor: "#4CAF50",
            backgroundGradientFrom: "#4CAF50",
            backgroundGradientTo: "#388E3C",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255,255,255,${opacity})`,
            labelColor: () => "#fff",
          }}
          style={{
            marginVertical: 8,
            borderRadius: 8,
          }}
        />
      )}

      {/* Tabla */}
      <View style={{ marginTop: 20 }}>
        <Text style={styles.subtitulo}>Detalle de Compras:</Text>

        {/* Encabezado */}
        <View style={styles.headerRow}>
          <Text style={[styles.headerCell, { flex: 2 }]}>Producto</Text>
          <Text style={[styles.headerCell, { flex: 1 }]}>Cantidad</Text>
          <Text style={[styles.headerCell, { flex: 1 }]}>Total</Text>
        </View>

        {/* Filas de datos o mensaje de sin productos */}
        <FlatList
          data={
            datos.length === 0 && datosCargados
              ? [
                  {
                    id: 0,
                    productoId: 0,
                    nombreProducto: "Sin productos",
                    cantidad: 0,
                    precioTotal: 0,
                    compradorId: 0,
                    vendedorId: 0,
                    fechaCompra: "",
                  },
                ]
              : datos
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
});
