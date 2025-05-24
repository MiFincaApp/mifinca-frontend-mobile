import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useRouter } from 'expo-router';
import Header from '@/components/header/header';
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = Constants.expoConfig?.extra?.apiUrl!;

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  imagen_url: string;
}

const Carrusel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const imagenes = [
    require('@/assets/images/carrusel/imagen1.jpg'),
    require('@/assets/images/carrusel/imagen2.jpg'),
    require('@/assets/images/carrusel/imagen3.jpg'),
  ];

  useEffect(() => {
    // Cambiar la imagen cada 10 segundos
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imagenes.length);
    }, 10000); // 10 segundos

    // Limpiar el intervalo cuando el componente se desmonte
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
          const response = await fetch(API_URL);
          const data: Producto[] = await response.json();
          setProductos(data);
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
      params:  { id: id.toString() },
    });
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Header />
      </View>

      <Carrusel />

      <Text style={styles.titulo}>Catálogo de Productos</Text>
      <View style={styles.catalogo}>
        {productos.length > 0 ? (
          <View style={styles.grid}>
            {productos.map((producto) => (
            <TouchableOpacity key={producto.id} style={styles.producto} onPress={() => handleProductClick(producto.id)}>
              <Image source={{ uri: producto.imagen_url }} style={styles.imagen} />
              <Text style={styles.nombre}>{producto.nombre}</Text>
              <Text style={styles.precio}>${producto.precio} / kg</Text>
            </TouchableOpacity>
            ))}
          </View>
        ) : (
          <Text style={styles.loading}>Cargando productos...</Text>
        )}
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: "#fff", padding: 10 },
  titulo: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginVertical: 15 },
  catalogo: { marginTop: 10 },
  
  //Hacemos que los productos se muestren en filas tipo grid
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  
  producto: {
    width: "30%", // cada producto ocupa el 30% del ancho para que quepan 3 por fila
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  
  imagen: { width: 100, height: 100, resizeMode: "contain", marginBottom: 5 },
  nombre: { fontSize: 16, fontWeight: "bold", textAlign: "center", color: "#333" },
  precio: { fontSize: 14, textAlign: "center", color: "#666" },
  loading: { textAlign: "center", marginTop: 20, fontSize: 16, color: "gray" },
  carruselContainer: { height: 200, marginTop: 20, marginBottom: 20, borderRadius: 10, overflow: 'hidden',},
  carruselImage: { width: '100%', height: '100%', objectFit: 'cover',},
});

export default index;