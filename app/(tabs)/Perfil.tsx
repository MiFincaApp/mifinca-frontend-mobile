import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '@/components/header/header';
import Constants from 'expo-constants';

const API_URL_PERFIL = Constants.expoConfig?.extra?.apiPerfilUrl!;

const Perfil = () => {
  const [rol, setRol] = useState<string | null>(null);
  const [nombre, setNombre] = useState('');
  const [username, setUsername] = useState('');
  const [correo, setCorreo] = useState('');

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
        } else {
          setRol(null);
        }

      } catch (err) {
        console.error("Error al obtener el perfil:", err);
      }
    };

    fetchUserProfile();
  }, []);

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
          <Image
            source={getIconSource()}
            style={styles.avatar}
          />
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
});


export default Perfil;