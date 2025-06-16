import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { CreditCard } from 'lucide-react-native';
import Header from '@/components/header/header';
import { useLocalSearchParams } from 'expo-router';
import Constants from 'expo-constants';
import { useCarrito } from '@/components/context/carrito/carritocontext';

const API_URL = Constants.expoConfig?.extra?.apiUrlProductDetail!;

// Producto que viene desde la API
interface ProductoAPI {
  idProducto: number;
  nombre: string;
  precio: number;
  descripcion: string;
  imagenUrl: string;
  fincaNombre: string;
  stock: number;
}

// Producto que se va al carrito
interface Producto {
  id: string;
  nombre: string;
  precio: number;
  imagen_url: string;
  fincaNombre: string;
  cantidad: number;
}

const DescripcionProducto = () => {
  const { agregarProducto } = useCarrito();
  const { id } = useLocalSearchParams();
  const [producto, setProducto] = useState<ProductoAPI | null>(null);
  const [cantidad, setCantidad] = useState<number>(1);

  useEffect(() => {
    if (id) {
      fetchProducto(id.toString());
    }
  }, [id]);

  const fetchProducto = async (productoId: string) => {
    try {
      const response = await fetch(`${API_URL}/${productoId}`, {
        headers: {
          'USER-MIFINCA-CLIENT': 'mifincaapp-mobile-android',
        },
      });

      const data = await response.json();
      const productoTransformado: ProductoAPI = {
        idProducto: data.idProducto,
        nombre: data.nombre,
        precio: data.precio,
        descripcion: data.descripcion,
        imagenUrl: data.imagenUrl,
        fincaNombre: data.fincaNombre,
        stock: data.cantidad,
      };

      setProducto(productoTransformado);
    } catch (error) {
      console.error('Error al cargar el producto:', error);
    }
  };

  const aumentarCantidad = () => {
    if (producto && cantidad < producto.stock) {
      setCantidad((prev) => prev + 1);
    }
  };

  const disminuirCantidad = () => {
    if (cantidad > 1) {
      setCantidad((prev) => prev - 1);
    }
  };

  const handleAgregarAlCarrito = () => {
    if (!producto) return;

    const productoParaCarrito: Producto = {
      id: producto.idProducto.toString(),
      nombre: producto.nombre,
      precio: producto.precio,
      imagen_url: producto.imagenUrl,
      fincaNombre: producto.fincaNombre,
      cantidad: cantidad,
    };

    agregarProducto(productoParaCarrito);
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

        <Image source={{ uri: producto.imagenUrl }} style={styles.imagen} />

        <View style={styles.infoCard}>
          <Text style={styles.nombre}>{producto.nombre}</Text>

          <Text style={styles.info}>Precio: ${producto.precio}</Text>
          <Text style={styles.info}>Descripción: {producto.descripcion}</Text>
          <Text style={styles.info}>Finca: {producto.fincaNombre}</Text>
          <Text style={styles.info}>Disponible: {producto.stock} unidades</Text>
        </View>

        <View style={styles.cantidadContainer}>
          <TouchableOpacity onPress={disminuirCantidad} style={styles.btnCantidad}>
            <Text style={styles.textoBoton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.cantidad}>{cantidad}</Text>
          <TouchableOpacity onPress={aumentarCantidad} style={styles.btnCantidad}>
            <Text style={styles.textoBoton}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.botonAgregar} onPress={handleAgregarAlCarrito}>
            <Text style={styles.textoBotonAgregar}>Agregar al carrito</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buyNowButton}>
            <CreditCard size={18} color="#fff" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Pagar</Text>
          </TouchableOpacity>
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
  imagen: {
    width: "100%",
    height: 220,
    resizeMode: "contain",
    borderRadius: 8,
    marginBottom: 16,
    marginTop: 16,
  },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 16,
  },
  nombre: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
    color: "#333",
  },
  info: {
    fontSize: 16,
    color: "#555",
    marginBottom: 6,
  },
  cantidadContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    justifyContent: "center",
  },
  cantidad: {
    fontSize: 20,
    marginHorizontal: 16,
  },
  btnCantidad: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
  },
  textoBoton: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonsContainer: {
    flexDirection: 'column', // los botones se apilan verticalmente
    gap: 12,
    marginTop: 20,
  },
  botonAgregar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50', // verde principal
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  textoBotonAgregar: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buyNowButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#388E3C', // un verde más oscuro
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonIcon: {
    marginRight: 8,
  }
});

export default DescripcionProducto;