import React, { useState } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Dimensions } from "react-native";

const screenHeight = Dimensions.get("window").height;

const MenuHamburguesa = () => {
  const [visible, setVisible] = useState(false);
  const [translateY] = useState(new Animated.Value(-screenHeight * 0.3));
  const navigation = useNavigation();

  const toggleMenu = () => {
    const toValue = visible ? -screenHeight * 0.3 : 0;
    Animated.timing(translateY, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setVisible(!visible);
  };

  const navigateTo = (screen: string) => {
    navigation.navigate(screen as never);
    toggleMenu();
  };

  return (
    <>
      <TouchableOpacity onPress={toggleMenu} style={styles.hamburgerButton}>
        <Text style={styles.hamburgerText}>≡</Text>
      </TouchableOpacity>

     
      <Animated.View 
        style={[
          styles.menuContainer, 
          { transform: [{ translateY }], opacity: visible ? 1 : 0 }
        ]}
      >
        <TouchableOpacity onPress={() => navigateTo("nosotros")}>
          <Text style={styles.menuItem}>Nosotros</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo("soporte")}>
          <Text style={styles.menuItem}>Soporte</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo("index")}>
          <Text style={styles.menuItem}>Catálogo</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  hamburgerButton: {
    left: 10,
    zIndex: 10,
  },
  hamburgerText: {
    fontSize: 30,
    color: "black",
  },
  menuContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "30%", 
    height: "30%",
    backgroundColor: "#f0f0f0",
    paddingTop: 60,
    paddingHorizontal: 10,
    zIndex: 5,
    elevation: 5,
  },
  menuItem: {
    fontSize: 18,
    marginVertical: 10,
    color: "black",
    
  },
});

export default MenuHamburguesa;
