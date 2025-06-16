import { useLocalSearchParams } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import InformesCampesino from "@/components/informes/informecampesino";
import MisProductos from "@/components/informes/misproductos";
import InformeComprador from "@/components/informes/informecomprador";
import { View, StyleSheet } from "react-native";
import Header from '@/components/header/header';

const Tab = createMaterialTopTabNavigator();

export default function Informes() {
  const { rol } = useLocalSearchParams();

  if (rol === "CAMPESINO") {
    return (
      <View style={styles.container}>
        <Header />
        <Tab.Navigator
          screenOptions={() => ({
            tabBarStyle: {
              marginTop: 15,
              backgroundColor: '#fff',
              elevation: 2,
            },
            tabBarLabelStyle: {
              color: '#000',
              fontWeight: 'bold',
            },
            tabBarIndicatorStyle: {
              backgroundColor: '#4CAF50',
            },
          })}
        >
          <Tab.Screen name="Mis Productos" component={MisProductos} />
          <Tab.Screen name="Informes Campesino" component={InformesCampesino} />
        </Tab.Navigator>
      </View>
    );
  }

  if (rol === "COMPRADOR") {
    return (
      <View style={styles.container}>
        <Header />
        <Tab.Navigator
          screenOptions={() => ({
            tabBarStyle: {
              backgroundColor: '#fff',
              elevation: 2,
            },
            tabBarLabelStyle: {
              color: '#000',
              fontWeight: 'bold',
            },
            tabBarIndicatorStyle: {
              backgroundColor: '#4CAF50',
            },
          })}
        >
          <Tab.Screen name="Informe Comprador" component={InformeComprador} />
        </Tab.Navigator>
      </View>
    );
  }

  return <View />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
});
