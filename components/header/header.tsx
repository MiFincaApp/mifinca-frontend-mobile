import React, { useState, useEffect } from "react";

import { View, Text, Image, TextInput, StyleSheet, Pressable, TouchableOpacity, Modal, FlatList, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useCarrito } from '@/components/context/carrito/carritocontext';
import Constants from 'expo-constants';

const API_URL_PERFIL = Constants.expoConfig?.extra?.apiPerfilUrl!;
const API_URL_LOGOUT = Constants.expoConfig?.extra?.apiLogoutUrl!;


/* Icons */
const icon = require("@/assets/images/logos/logo.png");
import { FontAwesome } from '@expo/vector-icons';


const Header: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const { carrito, total } = useCarrito();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [rol, setRol] = useState<string | null>(null);
  const [nombre, setNombre] = useState('');
  const [username, setUsername] = useState('');

  
  const router = useRouter();
  const closeMenu = () => setMenuVisible(false);
  
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (!token) return;

        setIsLoggedIn(true);

        const response = await fetch(`${API_URL_PERFIL}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'USER-MIFINCA-CLIENT': 'mifincaapp-mobile-android',
          },
        });

        if (!response.ok) throw new Error("Error al obtener el perfil");

        const data = await response.json();
        if (data.roles && data.roles.length > 0) {
          setRol(data.roles[0].nombreRol);
        } else {
          setRol(null);
        }

        if (data.nombre) {
          setNombre(data.nombre);
        }

        if (data.username) {
          setUsername(data.username);
        }
      } catch (err) {
        console.error("Error al obtener el rol:", err);
      }
    };

    fetchUserRole();
  }, []);

  const logout = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) {
        // No hay token para enviar a la API, pero sí eliminamos cualquier token almacenado
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('refreshToken');
        setIsLoggedIn(false);
        setRol(null);
        router.push('/iniciarsesion');
        return;
      }

      // Llamada a la API para cerrar sesión
      const response = await fetch(API_URL_LOGOUT, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'USER-MIFINCA-CLIENT': 'mifincaapp-mobile-android',
        },
      });

      if (response.ok) {
        // Si la respuesta es exitosa, elimina los tokens y redirige
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('refreshToken');
        setIsLoggedIn(false);
        setRol(null);
        router.push('/iniciarsesion');
      } else {
        // Si no es exitosa, no eliminar tokens ni redirigir.
        const errorData = await response.json();
        console.error('Error en logout:', errorData.message || response.statusText);
      }
    } catch (error) {
      // Error de red o inesperado: no eliminar tokens ni redirigir
      console.error('Error en logout:', error);
    }
  };

  const handleAccountPress = () => {
    if (isLoggedIn) {
      setMenuVisible(true);
    } else {
      router.push('/iniciarsesion');
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
    <View style={styles.header}>
      <Pressable onPress={() => router.push('/')}>
        <Image source={icon} style={styles.logo} />
      </Pressable>

      <TextInput
        style={styles.searchBar}
        placeholder="Buscar..."
        placeholderTextColor="#888"
      />

      <View style={styles.headerRight}>
        <View style={styles.iconsMenu}>
          <TouchableOpacity onPress={() => setVisible(true)}>
            <FontAwesome name="shopping-cart" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.iconsMenu}>
          <TouchableOpacity onPress={handleAccountPress}>
            {getIconSource() ? (
              <Image source={getIconSource()} style={{ width: 28, height: 28, borderRadius: 14 }} />
            ) : (
              <FontAwesome name="user-circle" size={28} color="black" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* 🔽 Sidebar Modal */}
      <Modal
        visible={visible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.sidebar}>
            <Text style={styles.sidebarTitle}>Carrito</Text>

            <FlatList
              data={carrito}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <Image source={{ uri: item.imagen_url }} style={styles.cardImage} />
                  <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{item.nombre}</Text>
                    <Text style={styles.cardPrice}>${item.precio}</Text>
                  </View>
                </View>
              )}
            />

            <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>

            <TouchableOpacity style={styles.checkoutButton} onPress={() => {/* lógica para pagar */}}>
              <Text style={styles.checkoutText}>Proceder a la compra</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setVisible(false)}>
              <Text style={styles.closeText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Menú desplegable de cuenta */}
      <Modal
        visible={menuVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeMenu}
      >
        <TouchableWithoutFeedback onPress={closeMenu}>
          <View style={styles.accountOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.accountSidebar}>
                {/* Encabezado con avatar e info */}
                <View style={styles.accountHeader}>
                  <Image
                    source={getIconSource()}
                    style={styles.accountAvatar}
                    resizeMode="contain"
                  />
                  <View style={styles.accountUserInfo}>
                    <Text style={styles.accountNombre}>{nombre}</Text>
                    <Text style={styles.accountUsername}>@{username}</Text>
                    <Text style={styles.accountRol}>{rol}</Text>
                  </View>
                </View>

                {/* Botones */}
                <TouchableOpacity
                  style={styles.buttonCuenta}
                  onPress={() => {
                    closeMenu();
                    router.push('/Perfil');
                  }}
                >
                  <Text style={styles.textoBotonCuenta}>Perfil</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buttonCuenta}
                  onPress={() => {
                    closeMenu();
                    logout();
                  }}
                >
                  <Text style={styles.textoBotonCuenta}>Cerrar sesión</Text>
                </TouchableOpacity>

              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#fff",
    position: 'relative',
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: "#f8f8f8",
    marginHorizontal: 10,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconsMenu: {
    marginHorizontal: 10,
  },

  icon: {
    width: 25,
    height: 25,
    marginHorizontal: 8,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 60,
    right: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    zIndex: 99,
  },
  menuItem: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  sidebar: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: '60%',
    height: '100%',
    backgroundColor: '#fff',
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: { width: -2, height: 0 },
    shadowRadius: 5,
    elevation: 5,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sidebarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cartImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  checkoutButton: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeText: {
    marginTop: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#fff',
    fontWeight: 'bold',
    height: 40,
    backgroundColor: 'red',
    width: '100%',
    borderRadius: 8,
  },
  card: {
    width: '90%',
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
    alignSelf: 'center',
  },
  
  cardImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
  
  cardContent: {
    flex: 1,
  },
  
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  cardPrice: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
  },
  // Estilos del modal de cuenta
  accountOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },

  accountSidebar: {
    width: '60%',
    backgroundColor: '#fff',
    padding: 20,
    right: 0,
    top: 0,
    height: '100%',
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10,
  },

  accountTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  // Estilos del encabezado del modal de cuenta
  accountHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    backgroundColor: 'rgb(6, 87, 6)',
    padding: 10,
    borderRadius: 10,
  },

  accountAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },

  accountUserInfo: {
    flex: 1,
  },

  accountNombre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },

  accountUsername: {
    fontSize: 14,
    color: '#fff',
  },

  accountRol: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#fff',
    marginTop: 2,
  },

  // Estilos del boton del modal de perfil
  buttonCuenta: {
    backgroundColor: "#4CAF50",
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 12,
    width: 200,
    marginVertical: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  textoBotonCuenta: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
}
);

export default Header;