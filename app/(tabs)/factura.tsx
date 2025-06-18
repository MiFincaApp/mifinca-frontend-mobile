import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';

interface Producto {
  nombre: string;
  cantidad: number;
  precioUnitario: number;
}

export default function Factura() {
  const { total, productos, cliente } = useLocalSearchParams();
  const productosParsed: Producto[] = JSON.parse(productos as string);
  const totalNumber = Number(total);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Factura</Text>
        <TouchableOpacity>
          <Feather name="download" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.facturaContent}>
        <Text style={styles.subtitulo}>Cliente: {cliente}</Text>
        <Text style={styles.subtitulo}>Productos:</Text>
        {productosParsed.map((p, index) => (
          <View key={index} style={styles.productoItem}>
            <Text style={styles.productoNombre}>{p.nombre}</Text>
            <Text style={styles.productoInfo}>
              {p.cantidad} x ${p.precioUnitario} = ${(p.cantidad * p.precioUnitario).toFixed(2)}
            </Text>
          </View>
        ))}
        <Text style={styles.total}>Total: ${totalNumber.toFixed(2)}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitulo: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
  facturaContent: {
    marginTop: 10,
  },
  productoItem: {
    marginVertical: 5,
  },
  productoNombre: {
    fontSize: 16,
    fontWeight: '600',
  },
  productoInfo: {
    fontSize: 14,
    color: '#555',
  },
  total: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});
