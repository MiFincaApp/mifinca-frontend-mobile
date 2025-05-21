import React, { useState, useEffect } from "react";
import { View, Text, Image, TextInput, StyleSheet, Pressable, TouchableOpacity, Modal, FlatList } from 'react-native';
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
  const [showMenu, setShowMenu] = useState(false);
  const [rol, setRol] = useState<string | null>(null);
  
  const router = useRouter();
  
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
        setRol(data.roles.nombre);
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
      setShowMenu(false);
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
      setShowMenu(false);
      router.push('/iniciarsesion');
    } else {
      // Si no es exitosa, no eliminar tokens ni redirigir.
      // Opcional: puedes mostrar un mensaje o log
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
      setShowMenu(prev => !prev);
    } else {
      router.push('/iniciarsesion');
    }
  };

  const getIconSource = () => {
    switch (rol) {
      case 'cliente':
        return require('@/assets/images/perfil/avatar-comprador.png');
      case 'campesino':
        return require('@/assets/images/perfil/avatar-vendedor.png');
      case 'admin':
        return require('@/assets/images/perfil/avatar-admin.png');
      default:
        return <FontAwesome name="user-circle" size={24} color="black" />
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
            <Image source={getIconSource()} style={{ width: 28, height: 28, borderRadius: 14 }} />
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
      {showMenu && (
        <View style={styles.dropdownMenu}>
          <Pressable onPress={() => {
            setShowMenu(false);
            router.push('/perfil');
          }}>
            <Text style={styles.menuItem}>Perfil</Text>
          </Pressable>

          <Pressable onPress={logout}>
            <Text style={styles.menuItem}>Cerrar sesión</Text>
          </Pressable>
        </View>
      )}
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
}
);

export default Header;