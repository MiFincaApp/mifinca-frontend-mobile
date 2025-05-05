import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import Header from '@/components/header/header';
import { useLocalSearchParams } from 'expo-router';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig?.extra?.apiUrl!;

interface Producto {
  id: string;
  nombre: string;
  imagen_url: string;
  descripcion: string;
  precio: number;
  origen: string;
}

const descripcionProducto = () => {
  const { id } = useLocalSearchParams();
  const [producto, setProducto] = useState<Producto | null>(null);

  useEffect(() => {
    if (id) {
      fetchProducto(id.toString());
    }
  }, [id]);

  const fetchProducto = async (productoId: string) => {
    try {
      const response = await fetch(`${API_URL}/${productoId}`);
      const data = await response.json();
      setProducto(data);
    } catch (error) {
      console.error('Error al cargar el producto:', error);
    }
  };

  if (!producto) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Header />
        <Text>Cargando producto...</Text>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />
      <View style={styles.productContainer}>
        <Text style={styles.title}>{producto.nombre}</Text>
        <Image source={{ uri: producto.imagen_url }} style={styles.productImage} />
        <Text style={styles.description}>
          <Text style={styles.bold}>Descripción del producto:</Text> {producto.descripcion}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.bold}>Precio:</Text> ${producto.precio} / kg
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.bold}>Lugar de origen:</Text> {producto.origen}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: { flexGrow: 1, backgroundColor: "#fff", padding: 10 },
    productContainer: {
        marginTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    productImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        marginVertical: 20,
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
    },
    detail: {
        fontSize: 14,
    },
    bold: {
        fontWeight: 'bold',
    },
});

export default descripcionProducto;