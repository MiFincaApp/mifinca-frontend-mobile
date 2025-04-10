import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>


      {/* Navegación de Tabs */}
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false, // Oculta la barra superior predeterminada de los tabs
        }}
      >
        <Tabs.Screen
          name="nosotros"
          options={{
            href: null, // Elimina la barra de pestañas
          }}
        />

        {/* pantalla 1 - iniciar sesion */}
        <Tabs.Screen
          name="iniciarsesion"
          options={{
            title: "iniciar sesion",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "person-add" : "person-add-outline"}
                color={color}
              />
            ),
          }}
        />

        {/* pantalla 2 - soporte */}
        <Tabs.Screen
          name="soporte"
          options={{
            href:null,
          }}
        />
        {/* pantalla 6 - catalogo de productos */}
        <Tabs.Screen
          name="index"
          options={{
            title: "catalogo",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "list" : "list-outline"}
                color={color}
              />
            ),
          }}
        />

        {/* Pantalla 3 - Register */}
        <Tabs.Screen
          name="register"
          options={{
            title: "Register",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "person-add" : "person-add-outline"}
                color={color}
              />
            ),
          }}
        />

        {/* Pantalla 4 - Frequent Questions */}
        <Tabs.Screen
          name="frecuentQuestion"
          options={{
            title: "Questions",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "help-circle" : "help-circle-outline"}
                color={color}
              />
            ),
          }}
        />

        {/* pantalla 5 - metodos de pago */}
        <Tabs.Screen                                                                      //esto es codigo prueba de freyman no borrar
          name="metododepago"
          options={{
            title: "metododepago",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "cash" : "cash-outline"}
                color={color}
              />
            ),
          }}
        />

        {/* pantalla 7 - buscar */}
        <Tabs.Screen
          name="buscar"
          options={{
            title: "buscar",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "search" : "search-outline"}
                color={color}
              />
            ),
          }}
        />

        {/* Pantalla 8 - Estado Pedido */}
        <Tabs.Screen
          name="estadopedido"
          options={{
            href: null, // Elimina la barra de pestañas
          }}
        />

        {/* Pantalla 9 - Preguntas Frecuentes */}
        <Tabs.Screen
          name="PreguntasFrecuentes"
          options={{
              href:null,
          }}
        />

        {/* Pantalla 10 - Informe Admin */}
        <Tabs.Screen
          name="informeadmin"
          options={{
            title: "informeadmin",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "information-outline" : "information"}
                color={color}
              />
            ),
          }}
        />

        {/* Pantalla 11 - Informe Campesino */}
        <Tabs.Screen
          name="informecampesino"
          options={{
            title: "informecampesino",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "information-outline" : "information"}
                color={color}
              />
            ),
          }}
        />

        {/* Pantalla 12 - Perfil */}
        <Tabs.Screen
          name="Perfil"
          options={{
            href: null, // Elimina la barra de pestañas
          }}
        />

        {/* Pantalla 13 - Descripción del producto */}
        <Tabs.Screen
          name="descripcionProducto"
          options={{
            href: null, // Elimina la barra de pestañas
          }}
        />

        {/* Pantalla 14 - Administración */}
        <Tabs.Screen
          name="administracion"
          options={{
            title: "Administración",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "information-outline" : "information"}
                color={color}
              />
            ),
          }}
        />

        {/* Pantalla 15 - Administrador */}
        <Tabs.Screen
          name="administrador"
          options={{
            title: "Administrador",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "information-outline" : "information"}
                color={color}
              />
            ),
          }}
        />

      </Tabs>
    </>
  );
}