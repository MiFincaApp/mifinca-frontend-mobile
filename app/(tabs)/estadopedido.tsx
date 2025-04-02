import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import Header from "./header/header";


const order = {
  number: '12345',
  status: 'En proceso',
  steps: [
    { name: 'Pedido recibido', status: 'completed' },
    { name: 'En proceso', status: 'current' },
    { name: 'Enviado', status: 'pending' }
  ]
};

const estadopedido = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      {/* Header */}
      <View>
        <Header />
      </View>
      
      {/* Contenido */}
      <View style={styles.container}>
        <Text style={styles.h1}>Estado de tu Pedido</Text>
        <View style={styles.orderCard}>
          <Text style={styles.h2}>Pedido #{order.number}</Text>
          <View style={styles.orderStatus}>
            <Text>Estado:</Text>
            <Text style={styles.statusBadge}>{order.status}</Text>
          </View>
          <View style={styles.orderProgress}>
            <View style={styles.progressBar}>
              {order.steps.map((step, index) => (
                <React.Fragment key={index}>
                  <View
                    style={[
                      styles.progressStep,
                      step.status === "Completo" && styles.completed,
                      step.status === "En curso" && styles.current,
                      step.status === "Pendiente" && styles.pending,
                    ]}
                  >
                    <Text>{index + 1}</Text>
                  </View>
                  {index < order.steps.length - 1 && (
                    <View
                      style={[
                        styles.progressLine,
                        step.status === "completed" && styles.completed,
                      ]}
                    />
                  )}
                </React.Fragment>
              ))}
            </View>
            <View style={styles.progressLabels}>
              {order.steps.map((step, index) => (
                <Text key={index}>{step.name}</Text>
              ))}
            </View>
          </View>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  headerRight: {
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 1,
    marginLeft: 20,
  },
  headerText: {
    fontSize: 12,
    color: "#000",
    marginHorizontal: 10,
  },
  main: {
    flexGrow: 1,
    padding: 40,
  },
  h1: {
    textAlign: "center",
    fontSize: 24,
    marginBottom: 30,
  },
  orderCard: {
    backgroundColor: "white",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    borderRadius: 8,
    padding: 24,
    maxWidth: 500,
    marginHorizontal: "auto",
  },
  h2: {
    fontSize: 20,
    marginBottom: 16,
  },
  orderStatus: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  statusBadge: {
    backgroundColor: "#fbbf24",
    color: "white",
    padding: 4,
    borderRadius: 9999,
    fontSize: 14,
    fontWeight: "bold",
  },
  orderProgress: {
    position: "relative",
  },
  progressBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  progressStep: {
    width: 32,
    height: 32,
    borderRadius: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "bold",
  },
  completed: {
    backgroundColor: "#10b981",
  },
  current: {
    backgroundColor: "#fbbf24",
  },
  pending: {
    backgroundColor: "#d1d5db",
    color: "#4b5563",
  },
  progressLine: {
    flexGrow: 1,
    height: 4,
    backgroundColor: "#d1d5db",
  },
  progressLabels: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 14,
  },
});

export default estadopedido;