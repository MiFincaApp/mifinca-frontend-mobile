import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Alert} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from 'expo-router';
import Header from '@/components/header/header';
import Constants from "expo-constants";

import Cargando from "@/components/screens/Cargando";

const API_URL = Constants.expoConfig?.extra?.apiUrlProducts!;

interface Producto {
  idProducto: number;
  nombre: string;
  precio: number;
  imagenUrl: string;
  fincaNombre: string;
}

const Carrusel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const imagenes = [
    require('@/assets/images/carrusel/imagen1.jpg'),
    require('@/assets/images/carrusel/imagen2.jpg'),
    require('@/assets/images/carrusel/imagen3.jpg'),
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imagenes.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.carruselContainer}>
      <Image source={imagenes[currentIndex]} style={styles.carruselImage} />
    </View>
  );
};

const index = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch(API_URL, {
          method: 'GET',
          headers: {
            'USER-MIFINCA-CLIENT': 'mifincaapp-mobile-android',
          },
        });

        if (!response.ok) {
          throw new Error(`Error en la respuesta: ${response.status}`);
        }

        const data: Producto[] = await response.json();

        // Ordenar y limitar
        const ordenados = data.sort((a, b) => a.precio - b.precio);
        const limitados = ordenados.slice(0, 6);

        setProductos(limitados);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };

    fetchProductos();
  }, []);

  const handleProductClick = (id: number | undefined) => {
    if (!id) {
      console.warn('ID de producto no válido');
      return;
    }
    router.push({
      pathname: '/descripcionProducto',
      params: { id: id.toString() },
    });
  };

  const cerrarSesion = async () => {
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
    Alert.alert("Sesión cerrada", "Has cerrado sesión correctamente.");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />
      <Carrusel />

      <TouchableOpacity onPress={cerrarSesion} style={{ alignSelf: 'flex-end', marginRight: 20, marginBottom: 10 }}>
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Cerrar sesión</Text>

      </TouchableOpacity>

      <Text style={styles.titulo}>Catálogo de Productos</Text>
      <View style={styles.catalogo}>
      {productos.length > 0 ? (
        <View style={styles.grid}>
          {productos.map((producto) => (
              <TouchableOpacity
                key={producto.idProducto}
                style={styles.producto}
                onPress={() => handleProductClick(producto.idProducto)}
              >
                <Image source={{ uri: producto.imagenUrl }} style={styles.imagen} />
                <Text style={styles.nombre}>Tipo: {producto.nombre}</Text>
                <Text style={styles.texto}>Precio: ${producto.precio} / kg</Text>
                <Text style={styles.texto}>Producido en: {producto.fincaNombre}</Text>
              </TouchableOpacity>
            ))}
        </View>
      ) : (
        <View style={styles.estadoContainer}>
          <Cargando />
          <Text style={styles.loading}>Cargando...</Text>
        </View>
      )}
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
    marginVertical: 20,
    textAlign: "center",
  },
  catalogo: {
    marginBottom: 30,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  producto: {
    width: "48%",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  imagen: {
    width: 140,
    height: 140,
    borderRadius: 12,
    resizeMode: "cover",
    marginBottom: 10,
    backgroundColor: "#e1e1e1",
  },
  nombre: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
    marginBottom: 6,
    textAlign: "center",
  },
  texto: {
    fontSize: 14,
    color: "#444",
    marginBottom: 2,
    textAlign: "center",
  },
  precio: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  loading: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    marginTop: 30,
  },
  carruselContainer: {
    height: 200,
    marginVertical: 20,
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "#ddd",
  },
  carruselImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  estadoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
});


export default index;
