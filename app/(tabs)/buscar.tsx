import React from "react";
import {View,Text,Image,TouchableOpacity,StyleSheet,ScrollView,} from "react-native";
import { useRouter } from 'expo-router';
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer'


const tomatepera = require ('@/assets/images/Frutas/tomatepera.jpeg');
const tomatecherry = require ('@/assets/images/Frutas/tomatecherry.jpeg');
const tomateraf = require ('@/assets/images/Frutas/tomateraf.jpeg');
const tomateverde = require ('@/assets/images/Frutas/tomateverde.jpeg');
const tomatedearbol = require ('@/assets/images/Frutas/tomatedearbol.jpeg');
const tomatebuey = require ('@/assets/images/Frutas/tomatebuey.jpeg');


const PaymentMethodsScreen = () => {
  const router = useRouter();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      {/* Header */}
      <View>
        <Header />
      </View>


      {/* Catálogo */}
      <View style={styles.buscar}>
        <Text >Buscar producto</Text>
        {/* Fila 1 */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.producto} onPress={() => router.push('/descripcionProducto')}>
            <Image source={tomatepera} style={styles.imagen} />
            <Text style={styles.nombre}>Tomate pera</Text>
            <Text style={styles.precio}>Precio por kilo 3000</Text>
            <Text style={styles.precio}>Lugar de procedencia: Pamplona</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.producto}>
            <Image source={tomatecherry} style={styles.imagen} />
            <Text style={styles.nombre}>Tomate Cherry</Text>
            <Text style={styles.precio}>Precio por kilo $2.900</Text>
            <Text style={styles.precio}>Lugar de procedencia: Tibú</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.producto}>
            <Image source={tomateraf} style={styles.imagen} />
            <Text style={styles.nombre}>Tomate Raf</Text>
            <Text style={styles.precio}>Precio por Kilo $2.500</Text>
            <Text style={styles.precio}>Lugar de procedencia: Durania</Text>
          </TouchableOpacity>
        </View>

        {/* Fila 2 */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.producto}>
            <Image source={tomateverde} style={styles.imagen} />
            <Text style={styles.nombre}>Tomate Verde</Text>
            <Text style={styles.precio}>Precio por Kilo $2.300</Text>
            <Text style={styles.precio}>Lugar de procedencia: Salazar de las palmas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.producto}>
            <Image source={tomatedearbol} style={styles.imagen} />
            <Text style={styles.nombre}>Tomate de arbol</Text>
            <Text style={styles.precio}>Precio por Kilo $2.000</Text>
            <Text style={styles.precio}>Lugar de procedencia: Zulia</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.producto}>
            <Image source={tomatebuey} style={styles.imagen} />
            <Text style={styles.nombre}>Tomate corazón de buey</Text>
            <Text style={styles.precio}>Precio por Kilo $2.900</Text>
            <Text style={styles.precio}>Lugar de procedencia: Pamplona</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Footer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    padding: 10,
  },

  banner: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 20,
  },
  buscar: {
    marginTop: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  producto: {
    alignItems: "center",
    width: 100,
  },
  imagen: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginBottom: 5,
  },
  nombre: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  precio: {
    fontSize: 12,
    textAlign: "center",
    color: "#666",
  },
});

export default PaymentMethodsScreen;