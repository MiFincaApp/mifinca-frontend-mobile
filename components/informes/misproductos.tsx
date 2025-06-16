import { View, Text, FlatList, Image, TouchableOpacity, Alert, Modal, TextInput } from "react-native";
import { useEffect, useState } from "react";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet } from "react-native";
import { router } from "expo-router";
import { AntDesign, Feather } from "@expo/vector-icons";

const API_URL_FINCAS = Constants.expoConfig?.extra?.apiUrlFincas!;
const API_URL_PRODUCTO_DELETE = Constants.expoConfig?.extra?.apiUrlProductDelete!;
const API_URL_PRODUCTO_UPDATE = Constants.expoConfig?.extra?.apiUrlProductUpdate!;

type Producto = {
  idProducto: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagenUrl: string;
  cantidad: number;
};

export default function MisProductos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [id, setId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      if (!token) {
        console.error("Token no encontrado");
        return;
      }

      const response = await fetch(`${API_URL_FINCAS}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "USER-MIFINCA-CLIENT": "mifincaapp-mobile-android",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setId(data.id);
        setProductos(data.productos);
      } else {
        console.error("Error al obtener productos", await response.text());
      }
    } catch (error) {
      console.error("Error de red:", error);
    } finally {
      setLoading(false);
    }
  };

  const eliminarProducto = async (idProducto: number) => {
    Alert.alert("Confirmar", "¿Estás seguro de que quieres eliminar este producto?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          try {
            const response = await fetch(`${API_URL_PRODUCTO_DELETE}/${idProducto}`, {
              method: "DELETE",
              headers: {
                "USER-MIFINCA-CLIENT": "mifincaapp-mobile-android",
              },
            });
            if (response.ok) {
              Alert.alert("Eliminado", "Producto eliminado correctamente");
              obtenerProductos();
            } else {
              Alert.alert("Error", "No se pudo eliminar el producto");
            }
          } catch (error) {
            Alert.alert("Error", "Error al eliminar el producto");
          }
        },
      },
    ]);
  };

  const irARegistroProducto = () => {
    if (id) {
      router.push(`/registroproduct?idFinca=${id}`);
    } else {
      console.warn("ID de finca no disponible");
    }
  };

  const abrirModalEdicion = (producto: Producto) => {
    setProductoSeleccionado(producto);
    setModalVisible(true);
  };

  const actualizarProducto = async () => {
    if (!productoSeleccionado) return;

    try {
      const response = await fetch(`${API_URL_PRODUCTO_UPDATE}/${productoSeleccionado.idProducto}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "USER-MIFINCA-CLIENT": "mifincaapp-mobile-android",
        },
        body: JSON.stringify({
          nombre: productoSeleccionado.nombre,
          descripcion: productoSeleccionado.descripcion,
          precio: productoSeleccionado.precio,
          cantidad: productoSeleccionado.cantidad,
        }),
      });

      if (response.ok) {
        Alert.alert("Actualizado", "Producto actualizado correctamente");
        setModalVisible(false);
        obtenerProductos();
      } else {
        Alert.alert("Error", "No se pudo actualizar el producto");
      }
    } catch (error) {
      Alert.alert("Error", "Error al actualizar el producto");
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.encabezado}>
        <Text style={styles.titulo}>Mis Productos</Text>

        <TouchableOpacity style={styles.botonCrear} onPress={irARegistroProducto}>
          <Text style={styles.botonCrearTexto}>Crear nuevo producto</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <Text>Cargando productos...</Text>
      ) : productos.length === 0 ? (
        <Text style={styles.mensajeVacio}>No tienes productos. Crea un producto.</Text>
      ) : (
        <FlatList
          contentContainerStyle={styles.flatListContent}
          data={productos}
          keyExtractor={(item) => item.idProducto.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.imagenUrl }} style={styles.imagen} />
              <View style={styles.info}>
                <Text style={styles.nombre}>{item.nombre}</Text>
                <Text style={styles.descripcion}>{item.descripcion}</Text>
                <Text style={styles.precio}>${item.precio}</Text>
                <Text style={styles.cantidad}>Cantidad: {item.cantidad}</Text>
              </View>
              <View style={styles.iconos}>
                <TouchableOpacity onPress={() => eliminarProducto(item.idProducto)}>
                  <AntDesign name="delete" size={20} color="red" style={{ marginLeft: 12 }} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Producto</Text>

            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={productoSeleccionado?.nombre}
              onChangeText={(text) =>
                setProductoSeleccionado({ ...productoSeleccionado!, nombre: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Descripción"
              value={productoSeleccionado?.descripcion}
              onChangeText={(text) =>
                setProductoSeleccionado({ ...productoSeleccionado!, descripcion: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Precio"
              keyboardType="numeric"
              value={productoSeleccionado?.precio.toString()}
              onChangeText={(text) =>
                setProductoSeleccionado({ ...productoSeleccionado!, precio: parseFloat(text) || 0 })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Cantidad"
              keyboardType="numeric"
              value={productoSeleccionado?.cantidad.toString()}
              onChangeText={(text) =>
                setProductoSeleccionado({ ...productoSeleccionado!, cantidad: parseInt(text) || 0 })
              }
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.botonCancelar}>
                <Text style={styles.botonCancelarTexto}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={actualizarProducto} style={styles.botonActualizar}>
                <Text style={styles.botonActualizarTexto}>Actualizar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  encabezado: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
  },
  mensajeVacio: {
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
    color: "#888",
  },
  card: {
    flexDirection: "row",            // Imagen - Info - Iconos en línea
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    minHeight: 130,                  // Espacio vertical suficiente para íconos en columna
  },
  imagen: {
    width: 100,
    height: 100,
    borderRadius: 10,
    resizeMode: "cover",
    marginRight: 10,
  },
  info: {
    flex: 1,                         // Ocupar espacio restante
    justifyContent: "center",
  },
  nombre: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  descripcion: {
    fontSize: 14,
    color: "#666",
    marginBottom: 6,
  },
  precio: {
    fontSize: 16,
    color: "#4CAF50",
    fontWeight: "bold",
    marginBottom: 4,
  },
  cantidad: {
    fontSize: 13,
    color: "#999",
  },
  iconos: {
    justifyContent: "center",       // Centrar verticalmente
    alignItems: "center",           // Centrar horizontalmente
    flexDirection: "column",        // Alinear íconos en columna
    marginLeft: 10,
  },
  botonCrear: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  botonCrearTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  flatListContent: {
    paddingBottom: 50, // Para que no se corte al final
  },

  // Estilos del modal
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "90%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  botonCancelar: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 5,
  },
  botonActualizar: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginLeft: 5,
  },
  botonCancelarTexto: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
  botonActualizarTexto: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
});