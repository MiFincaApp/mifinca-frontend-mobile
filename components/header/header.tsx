import React, { useState, useEffect } from "react";
import { View, Image, TextInput, StyleSheet, Pressable, TouchableOpacity, Text,} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

/* Icons */
const icon = require("@/assets/images/logo.png");
import { BsPeopleFill } from "react-icons/bs";
import { FaBoxesStacked } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

const Header: React.FC = () => {
  
  const router = useRouter();
  
  /*
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkToken();
  }, []);

  const handleAccountPress = () => {
    if (isLoggedIn) {
      setShowMenu(prev => !prev);
    } else {
      router.push('/login');
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setIsLoggedIn(false);
    setShowMenu(false);
    router.push('/login');
  };
  */

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
        <Pressable onPress={() => router.push('/nosotros')}>
          <BsPeopleFill />
        </Pressable>

        <Pressable onPress={() => router.push('/estadopedido')}>
          <FaBoxesStacked />
        </Pressable>

          <FaShoppingCart />

        <TouchableOpacity onPress={() => router.push('/perfil')}>
          <FaUserCircle />
        </TouchableOpacity>
      </View>

      {/* va en la linea 72 onPress={handleAccountPress} */}

      
      {/* {showMenu && (
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
      )} */}

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
});

export default Header;