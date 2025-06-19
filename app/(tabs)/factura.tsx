import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Header from '@/components/header/header';

interface Producto {
  nombre: string;
  cantidad: number;
  precioUnitario: number;
}

export default function Factura() {
  const { total, productos, estado } = useLocalSearchParams();
  const productosParsed: Producto[] = JSON.parse(productos as string);
  const totalNumber = Number(total);
  const estadoPago = estado === "aceptado" ? "✅ Pago aprobado" : "❌ Pago declinado";
  const colorEstado = estado === "aceptado" ? '#4CAF50' : '#F44336';

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Image source={require("@/assets/images/logos/logo.png")} style={styles.logo} />

          <Text style={styles.titulo}>Factura</Text>
          <Text style={[styles.estado, { color: colorEstado }]}>{estadoPago}</Text>

          <Text style={styles.subtitulo}>🧾 Productos:</Text>
          {productosParsed.map((p, index) => (
            <View key={index} style={styles.productoItem}>
              <Text style={styles.productoNombre}>{p.nombre}</Text>
              <Text style={styles.productoInfo}>
                {p.cantidad} x ${p.precioUnitario} = ${(p.cantidad * p.precioUnitario).toFixed(2)}
              </Text>
            </View>
          ))}

          <Text style={styles.total}>Total: ${totalNumber.toFixed(2)}</Text>

          <Text style={styles.recojoText}>
            📍 Recoge tu pedido en la dirección:{"\n"}
            <Text style={styles.direccion}>Avenida 6 # 10-15 Centro</Text>
          </Text>

          <TouchableOpacity style={styles.botonVolver} onPress={() => router.push("/")}>
            <Text style={styles.textoBotonVolver}>Volver al comercio</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  card: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#f9f9f9',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: "center",
    marginBottom: 10,
    color: '#222',
  },
  estado: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: "center",
    marginBottom: 20,
  },
  subtitulo: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: "#333",
  },
  productoItem: {
    marginBottom: 10,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  productoNombre: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
  },
  productoInfo: {
    fontSize: 14,
    color: '#666',
  },
  total: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textAlign: "right",
  },
  recojoText: {
    fontSize: 15,
    marginTop: 30,
    textAlign: "center",
    color: "#333",
    lineHeight: 22,
  },
  direccion: {
    fontWeight: "bold",
    color: "#000",
  },
  botonVolver: {
    backgroundColor: "#000",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30,
  },
  textoBotonVolver: {
    color: "#B9F227",
    fontWeight: "bold",
    fontSize: 16,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 10,
  },
});
