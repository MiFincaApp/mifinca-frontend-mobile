import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ShoppingCart, CreditCard } from "lucide-react-native"
import Header from '@/components/header/header';
import { useLocalSearchParams } from 'expo-router';
import Constants from 'expo-constants';
import { useCarrito } from "@/components/context/carrito/carritocontext";

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
  const { agregarProducto } = useCarrito();

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
        
        <View style={styles.imageContainer}>
          <Image source={{ uri: producto.imagen_url }} style={styles.productImage} />
        </View>

        <Text style={styles.title}>{producto.nombre}</Text>

        <View style={styles.infoContainer}>
          <View style={styles.descriptionBox}>
            <Text style={styles.descriptionLabel}>Descripción del producto:</Text>
            <Text style={styles.descriptionText}>{producto.descripcion}</Text>
          </View>

          <View style={styles.detailBox}>
            <Text style={styles.detailLabel}>Precio:</Text>
            <Text style={styles.detailValue}>${producto.precio} / kg</Text>
          </View>

          <View style={styles.detailBox}>
            <Text style={styles.detailLabel}>Lugar de origen:</Text>
            <Text style={styles.detailValue}>{producto.origen}</Text>
          </View>
        </View>

        <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => {
              if (producto) agregarProducto(producto);
            }}
          >
        <ShoppingCart size={18} color="#000" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Agregar a carrito</Text>
      </TouchableOpacity>

          <TouchableOpacity style={styles.buyNowButton}>
            <CreditCard size={18} color="#000" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Pagar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: "#fff", padding: 10 },

  productContainer: {
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  imageContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  productImage: {
    width: "100%",
    height: 220,
    resizeMode: "contain",
  },
  infoContainer: {
    marginBottom: 20,
  },
  descriptionBox: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#ddd",
  },
  descriptionLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  descriptionText: {
    fontSize: 15,
    lineHeight: 22,
  },
  detailBox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 6,
  },
  detailLabel: {
    fontSize: 15,
    fontWeight: "bold",
    marginRight: 8,
    width: 100,
  },
  detailValue: {
    fontSize: 15,
    flex: 1,
  },
  buttonsContainer: {
    marginTop: 10,
    gap: 12,
  },
  addToCartButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 14,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  buyNowButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e6e6e6",
    borderRadius: 8,
    padding: 14,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
})

export default descripcionProducto;