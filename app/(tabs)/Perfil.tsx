import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView, Modal, TextInput, Pressable, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '@/components/header/header';
import Constants from 'expo-constants';
import { useRouter } from "expo-router";

import ErrorAnimation from "@/components/screens/Error";
import { MaterialCommunityIcons, FontAwesome5, Ionicons } from "@expo/vector-icons";

const API_URL_PERFIL = Constants.expoConfig?.extra?.apiPerfilUrl!;
const API_URL_FINCAS = Constants.expoConfig?.extra?.apiUrlFincas!;
const API_URL_CREAR_FINCA = Constants.expoConfig?.extra?.apiUrlCrearFinca!;

const Perfil = () => {
  const router = useRouter();

  const [rol, setRol] = useState<string | null>(null);
  const [nombre, setNombre] = useState('');
  const [username, setUsername] = useState('');
  const [correo, setCorreo] = useState('');

  const [finca, setFinca] = useState<{ nombre: string; ubicacion: string } | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [fincaNombre, setFincaNombre] = useState("");
  const [fincaUbicacion, setFincaUbicacion] = useState("");

  const [errorVisible, setErrorVisible] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  const mostrarError = (mensaje: string) => {
    setMensajeError(mensaje);
    setErrorVisible(true);
    setTimeout(() => setErrorVisible(false), 3000); // Oculta el modal luego de 3s
  };


  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (!token) return;

        const response = await fetch(`${API_URL_PERFIL}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'USER-MIFINCA-CLIENT': 'mifincaapp-mobile-android',
          },
        });

        if (!response.ok) throw new Error("Error al obtener el perfil");

        const data = await response.json();

        setNombre(data.nombre || '');
        setUsername(data.username || '');
        setCorreo(data.email || '');
        
        if (data.roles && data.roles.length > 0) {
          setRol(data.roles[0].nombreRol);
        } 
        
        if (data.roles?.[0]?.nombreRol === "CAMPESINO") {
        const responseFinca = await fetch(`${API_URL_FINCAS}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "USER-MIFINCA-CLIENT": "mifincaapp-mobile-android",
          },
        });

        if (responseFinca.ok) {
          const fincaData = await responseFinca.json();
          setFinca(fincaData);
        } else {
          // No tiene finca creada
          setFinca(null);
        }
      }
    } catch (err) {
      console.error("Error al obtener perfil o finca:", err);
    }
  };

    fetchUserProfile();
  }, []);

  const crearFinca = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      if (!token) return;

      if (!fincaNombre.trim() || !fincaUbicacion.trim()) {
        mostrarError("Debe completar todos los campos");
        return;
      }

      const response = await fetch(`${API_URL_CREAR_FINCA}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "USER-MIFINCA-CLIENT": "mifincaapp-mobile-android",
        },
        body: JSON.stringify({
          nombre: fincaNombre,
          ubicacion: fincaUbicacion,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al crear la finca");
      }

      const data = await response.json();
      setFinca(data);
      setModalVisible(false);
      setFincaNombre("");
      setFincaUbicacion("");
    } catch (err) {
      mostrarError("No se pudo crear la finca");
      console.error(err);
    }
  };

  const getIconSource = () => {
    switch (rol) {
      case 'COMPRADOR':
        return require('@/assets/images/perfil/avatar-comprador.png');
      case 'CAMPESINO':
        return require('@/assets/images/perfil/avatar-vendedor.png');
      case 'ADMIN':
        return require('@/assets/images/perfil/avatar-admin.png');
      default:
        return null;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />

      <View style={styles.profileContainer}>
        <Image source={getIconSource()} style={styles.avatar} />
        <Text style={styles.title}>{nombre}</Text>

        <View style={styles.profileInfo}>
          <Text style={styles.label}>Nombre:</Text>
          <Text style={styles.value}>{nombre}</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.label}>Username:</Text>
          <Text style={styles.value}>@{username}</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.label}>Correo:</Text>
          <Text style={styles.value}>{correo}</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.label}>Rol:</Text>
          <Text style={styles.value}>{rol}</Text>
        </View>
      </View>

        {rol === "CAMPESINO" && (
        <View style={styles.section}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Text style={styles.sectionTitle}>Finca</Text>
            {finca && (
              <Pressable
                onPress={() => router.push({ pathname: "/informes", params: { rol: "CAMPESINO" } })}
                style={styles.botonIrAInformes}
              >
                <Ionicons name="chevron-forward-circle" size={28} color="#4CAF50" />
              </Pressable>
            )}
          </View>

          {finca ? (
            <View style={styles.fincaBox}>
              <MaterialCommunityIcons
                name="barn"
                size={40}
                color="#4CAF50"
                style={{ marginRight: 10 }}
              />
              <View>
                <Text style={styles.fincaNombre}>{finca.nombre}</Text>
                <Text style={styles.fincaUbicacion}>{finca.ubicacion}</Text>
              </View>
            </View>
          ) : (
            <View style={{ alignItems: "center", marginTop: 10 }}>
              <Text style={styles.mensajeFinca}>
                ¡Crea tu finca y empieza tu aventura en MiFincaApp!
              </Text>
              <Pressable
                onPress={() => setModalVisible(true)}
                style={styles.botonFinca}
              >
                <Text style={styles.botonTexto}>Crear Finca</Text>
              </Pressable>
            </View>
          )}
        </View>
      )}

      {rol === "COMPRADOR" && (
        <View style={styles.section}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Text style={styles.sectionTitle}>Informes de sus compras realizadas</Text>
            <Pressable
              onPress={() => router.push({ pathname: "/informes", params: { rol: "COMPRADOR" } })}
              style={styles.botonIrAInformes}
            >
              <Ionicons name="chevron-forward-circle" size={28} color="#4CAF50" />
            </Pressable>
          </View>

          <View style={styles.iconWithDescription}>
            <FontAwesome5 name="file-invoice-dollar" style={styles.iconStyle} />
            <Text style={styles.sectionDescription}>
              Aquí puede ver el resumen de todas sus compras
            </Text>
          </View>

        </View>
      )}

      {rol === "ADMIN" && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informes realizados en la app</Text>
          <Text style={styles.sectionDescription}>
            Resumen general de todas las actividades
          </Text>
          <MaterialCommunityIcons
            name="chart-bar"
            size={60}
            color="#4CAF50"
            style={{ marginTop: 10 }}
          />
        </View>
      )}

      {/* Modal para crear finca */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Crear Finca</Text>
            <TextInput
              placeholder="Nombre de la finca"
              value={fincaNombre}
              onChangeText={setFincaNombre}
              style={styles.input}
            />
            <TextInput
              placeholder="Ubicación"
              value={fincaUbicacion}
              onChangeText={setFincaUbicacion}
              style={styles.input}
            />
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Pressable onPress={() => setModalVisible(false)} style={[styles.botonFinca, { backgroundColor: "#ccc" }]}>
                <Text>Cancelar</Text>
              </Pressable>
              <Pressable onPress={crearFinca} style={styles.botonFinca}>
                <Text style={styles.botonTexto}>Crear</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={errorVisible}
        onRequestClose={() => setErrorVisible(false)}
      >
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <ErrorAnimation />
            <Text style={modalStyles.successText}>{mensajeError}</Text>
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

  profileContainer: {
    marginTop: 30,
    padding: 25,
    backgroundColor: "#fff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 18,
    borderWidth: 2,
    borderColor: "#2e7d32",
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2e7d32",
    marginBottom: 25,
  },

  profileInfo: {
    width: '100%',
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#c8e6c9",
    paddingVertical: 14,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#388e3c",
  },

  value: {
    fontSize: 16,
    fontWeight: "400",
    color: "#1b5e20",
  },

  section: {
    marginTop: 30,
    padding: 20,
    backgroundColor: "#f1f8e9",
    borderRadius: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    color: "#2e7d32",
  },
  sectionDescription: {
    fontSize: 14,
    color: "#4e944f",
    flex: 1,
    flexWrap: "wrap",
  },
  iconWithDescription: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  iconStyle: {
    fontSize: 30,
    color: "#4CAF50",
    marginRight: 10,
  },

  fincaBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  fincaNombre: {
    fontSize: 16,
    fontWeight: "600",
  },
  fincaUbicacion: {
    fontSize: 14,
    color: "#555",
  },
  mensajeFinca: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 10,
  },

  botonFinca: {
    backgroundColor: "#4CAF50",
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },

  botonTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "#000000aa",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#c8e6c9",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },

  botonIrAInformes: {
    padding: 5,
    borderRadius: 20,
  },
});

const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: '80%',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  successText: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: "bold",
  },
});



export default Perfil;