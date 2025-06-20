import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import InformesCampesino from "@/components/informes/informecampesino";
import MisProductos from "@/components/informes/misproductos";
import InformeComprador from "@/components/informes/informecomprador";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Header from "@/components/header/header";

export default function Informes() {
  const { rol } = useLocalSearchParams();
  const [selectedTab, setSelectedTab] = useState<'productos' | 'informes'>('productos');

  const renderCampesinoContent = () => {
    return (
      <View style={{ flex: 1 }}>
        {/* Tabs manuales */}
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tabButton, selectedTab === 'productos' && styles.activeTab]}
            onPress={() => setSelectedTab('productos')}
          >
            <Text style={[styles.tabText, selectedTab === 'productos' && styles.activeTabText]}>
              Mis Productos
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabButton, selectedTab === 'informes' && styles.activeTab]}
            onPress={() => setSelectedTab('informes')}
          >
            <Text style={[styles.tabText, selectedTab === 'informes' && styles.activeTabText]}>
              Informes Campesino
            </Text>
          </TouchableOpacity>
        </View>

        {/* Contenido según la pestaña */}
        <View style={{ flex: 1 }}>
          {selectedTab === 'productos' && <MisProductos />}
          {selectedTab === 'informes' && <InformesCampesino />}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header />

      {rol === "CAMPESINO" && renderCampesinoContent()}

      {rol === "COMPRADOR" && <InformeComprador />}

      {!rol && (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>
          Rol no especificado o no válido
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  tabBar: {
    flexDirection: 'row',
    marginTop: 15,
    backgroundColor: '#fff',
    elevation: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabText: {
    color: '#000',
    fontWeight: 'bold',
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#4CAF50',
  },
  activeTabText: {
    color: '#4CAF50',
  },
});