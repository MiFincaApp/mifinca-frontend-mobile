import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Modal,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import Header from "@/components/header/header";
import Constants from "expo-constants";
import Cargando from "@/components/screens/Cargando";

const API_URL = Constants.expoConfig?.extra?.apiUrlProducts!;
const { width } = Dimensions.get("window");

interface Producto {
  idProducto: number;
  nombre: string;
  precio: number;
  imagenUrl: string;
  fincaNombre: string;
  cantidad: number;
}

const Carrusel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [carouselWidth, setCarouselWidth] = useState(width);
  const scrollRef = useRef<ScrollView>(null);

  const imagenes = [
    require("@/assets/images/carrusel/imagen1.jpg"),
    require("@/assets/images/carrusel/imagen2.jpg"),
    require("@/assets/images/carrusel/imagen3.jpg"),
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % imagenes.length;
      setCurrentIndex(nextIndex);
      scrollRef.current?.scrollTo({ x: nextIndex * carouselWidth, animated: true });
    }, 10000);

    return () => clearInterval(interval);
  }, [currentIndex, carouselWidth]);

  const handleScroll = (event: any) => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / carouselWidth);
    setCurrentIndex(newIndex);
  };

  return (
    <View
      style={styles.carruselContainer}
      onLayout={(e) => setCarouselWidth(e.nativeEvent.layout.width)}
    >
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {imagenes.map((img, index) => (
          <Image
            key={index}
            source={img}
            style={[styles.carruselImage, { width: carouselWidth }]}
          />
        ))}
      </ScrollView>

      {/* Indicadores */}
      <View style={styles.indicatorOverlay}>
        {imagenes.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentIndex === index && styles.activeIndicator,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const Index = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const productosPorPagina = 6;

  useEffect(() => {
    const checkModal = async () => {
      const yaMostrado = await AsyncStorage.getItem("bienvenidaMostrada");
      if (!yaMostrado) {
        setShowModal(true);
        await AsyncStorage.setItem("bienvenidaMostrada", "true");
      }
    };
    checkModal();
  }, []);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            "USER-MIFINCA-CLIENT": "mifincaapp-mobile-android",
          },
        });

        if (!response.ok) {
          throw new Error(`Error en la respuesta: ${response.status}`);
        }

        const data: Producto[] = await response.json();
        const disponibles = data.filter((p) => p.cantidad > 0);
        const ordenados = disponibles.sort((a, b) => a.precio - b.precio);
        setProductos(ordenados);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };

    fetchProductos();
  }, []);

  const totalPaginas = Math.ceil(productos.length / productosPorPagina);
  const inicio = (currentPage - 1) * productosPorPagina;
  const fin = inicio + productosPorPagina;
  const productosActuales = productos.slice(inicio, fin);

  const handleProductClick = (id: number | undefined) => {
    if (!id) {
      console.warn("ID de producto no válido");
      return;
    }
    router.push({ pathname: "/descripcionProducto", params: { id: id.toString() } });
  };

  const renderPaginacion = () => {
    const paginasVisibles = 3;
    let inicio = Math.max(currentPage - 1, 1);
    let fin = Math.min(inicio + paginasVisibles - 1, totalPaginas);

    if (fin - inicio < paginasVisibles - 1) {
      inicio = Math.max(fin - paginasVisibles + 1, 1);
    }

    const botones = [];
    for (let i = inicio; i <= fin; i++) {
      botones.push(
        <TouchableOpacity
          key={i}
          style={[styles.paginaBoton, currentPage === i && styles.paginaBotonActivo]}
          onPress={() => setCurrentPage(i)}
        >
          <Text style={[styles.paginaTexto, currentPage === i && styles.paginaTextoActivo]}>{i}</Text>
        </TouchableOpacity>
      );
    }

    return <View style={styles.paginacion}>{botones}</View>;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />
      <Carrusel />

      <Text style={styles.titulo}>Catálogo de Productos</Text>
      <View style={styles.catalogo}>
        {productosActuales.length > 0 ? (
          <View style={styles.grid}>
            {productosActuales.map((producto) => (
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
            <Text style={styles.loading}>
              No hay productos disponibles en este momento.
            </Text>
          </View>
        )}
        {renderPaginacion()}
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Bienvenido a MiFincaApp</Text>
            <Text style={styles.modalText}>
              Para realizar pagos debes tener inicio de sesión.
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.modalButtonText}>Entendido</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    height: 200,
    resizeMode: "cover",
  },
  estadoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },

  // Modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  modalView: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#333",
  },
  modalText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#28a745",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  indicatorOverlay: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
    opacity: 0.8,
  },
  activeIndicator: {
    backgroundColor: "#fff",
    width: 12,
    height: 12,
  },
  paginacion: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    gap: 6,
    marginBottom: 40,
  },
  paginaBoton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#fff", // Blanco por defecto
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#000", // Borde verde claro
  },
  paginaBotonActivo: {
    backgroundColor: "#4CAF50", // Verde claro solo para activo
  },
  paginaTexto: {
    fontSize: 16,
    color: "#000", // Negro por defecto
  },
  paginaTextoActivo: {
    color: "#fff", // Blanco cuando es activo
  },
});

export default Index;
