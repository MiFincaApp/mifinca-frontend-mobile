import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Header from '@/components/header/header'; //Aseguramos que el header esté presente

// const API_URL = "http://192.168.1.35:8080/api/products"; // Cambia según tu entorno
const API_URL = "https://api.mifincaapp.com/api/products";


interface Producto {
  id_producto: number;
  nombre: string;
  precio: number;
  imagen_url: string;
}

const CatalogoScreen = () => {
  const [productos, setProductos] = useState<Producto[]>([]);

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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Agregamos el Header nuevamente */}
      <Header />

      <Text style={styles.titulo}>Catálogo de Productos</Text>

      <View style={styles.catalogo}>
        {productos.length > 0 ? (
          <View style={styles.grid}>
            {productos.map((producto) => (
              <TouchableOpacity key={producto.id_producto} style={styles.producto}>
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
});

export default CatalogoScreen;
