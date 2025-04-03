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
        {/* Pantalla 1 -  Nosotros */}
        <Tabs.Screen
          name="nosotros"
          options={{
            title: "Nosotros",
            tabBarIcon: ({ color, focused}) => (
              <TabBarIcon
                name={focused ? "people" : "people-outline"}
                color={color}
              />
            )
          }}
        />
        {/* pantalla 2 - soporte */}
        <Tabs.Screen
          name="soporte"
          options={{
            title: "Soporte",
            tabBarIcon: ({ color, focused}) => (
              <TabBarIcon
                name={focused ? "help-circle" : "help-circle-outline"}
                color={color}
              />
            )
          }}
        />
        <Tabs.Screen
          name="tickets"
          options={{
            title: "Tickets",
            tabBarIcon: ({ color, focused}) => (
              <TabBarIcon
                name={focused ? "people" : "people-outline"}
                color={color}
              />
            )
          }}
        />
        {/* pantalla 6 - catalogo de productos */} //esto es codigo prueba de freyman no borrar
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
      </Tabs>
    </>
  );
}