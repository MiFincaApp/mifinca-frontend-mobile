import React, { useState, useEffect } from 'react';
import {View,Text,Image,StyleSheet,ScrollView, SafeAreaView, TouchableOpacity, Platform} from "react-native";
import { useRouter, useLocalSearchParams } from 'expo-router';
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer'
import Constants from "expo-constants";

import Cargando from "@/components/screens/Cargando";
import NoResult from "@/components/screens/NoResult";

const API_URL = Constants.expoConfig?.extra?.apiUrlFilterProducts!;

interface Producto {
  idProducto: number;
  nombre: string;
  precio: number;
  imagenUrl: string;
  fincaNombre: string;
  cantidad: number; // ✅ agregado para filtrar por stock
}

const BuscarScreen = () => {
  const router = useRouter();
  const { termino } = useLocalSearchParams<{ termino: string }>();
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!termino) return;

    const buscar = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_URL}?nombre=${encodeURIComponent(termino)}`, {
          method: 'GET',
          headers: {
            'USER-MIFINCA-CLIENT': 'mifincaapp-mobile-android',
          },
        });

        const text = await response.text();

        if (!response.ok) {
          throw new Error('Error en la búsqueda');
        }

        if (text.includes('Producto no se encuentra en este momento')) {
          setProductos([]);
        } else {
          const data = JSON.parse(text);
          const disponibles = data.filter((p: Producto) => p.cantidad > 0); // ✅ filtrar cantidad > 0
          setProductos(data);
        }

      } catch (err) {
        console.error('Error en búsqueda:', err);
        setError('Error al buscar productos');
        setProductos([]);
      } finally {
        setLoading(false);
      }
    };

    buscar();
  }, [termino]);

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

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header />
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Resultados para: "{termino}"</Text>

          {loading && (
            <View style={styles.estadoContainer}>
              <Cargando />
              <Text style={styles.loading}>Cargando...</Text>
            </View>
          )}

          {!loading && productos.length === 0 && (
            <View style={styles.estadoContainer}>
              <NoResult />
              <Text style={styles.noResults}>No se encontraron productos.</Text>
            </View>
          )}


          {!loading && productos.length > 0 && (
            <View style={styles.grid}>
              {productos.map(producto => (
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
          )}
        </ScrollView>
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flexGrow: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  container: {
    paddingBottom: 80,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
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
  loading: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    marginTop: 30,
  },
  error: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginTop: 30,
  },
  noResults: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    marginTop: 30,
  },
  estadoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
});

export default BuscarScreen;