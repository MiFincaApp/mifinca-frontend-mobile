import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

const icon = require('@/assets/images/logo.png');

const faqs = [
  {
    id: 1,
    pregunta: "¿Que es un sistema de comtenido?",
    respuesta: "Contenido de la respuesta...."
  },
  {
    id: 2,
    pregunta: "¿Cuál es el producto agotado?",
    respuesta: "Contenido de la respuesta...."
  },
  {
    id: 3,
    pregunta: "¿Cual es el problema con la transacción?",
    respuesta: "Contenido de la respuesta...."
  },
  {
    id: 4,
    pregunta: "¿Aun problema con el funcionamiento de la pagina?",
    respuesta: "Contenido de la respuesta...."
  },
  {
    id: 5,
    pregunta: "Debo alojar el sitio web de mi empresa en CMS hub?",
    respuesta: "Contenido de la respuesta...."
  },
  {
    id: 6,
    pregunta: "Ajuste en el sistema",
    respuesta: "Contenido de la respuesta...."
  },
  {
    id: 7,
    pregunta: "¿Con que recursos puedo comenzar?",
    respuesta: "Contenido de la respuesta...."
  }
];

const PreguntasFrecuentes = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={icon} style={styles.logo} />
        <View style={styles.headerRight}>
          <Text style={styles.headerText}>Obten nuestra app</Text>
          <Text style={styles.headerText}>Mis pedidos</Text>
          <Text style={styles.headerText}>Carrito</Text>
          <Text style={styles.headerText}>Cuenta</Text>
        </View>
      </View>

      {/* FAQ Section */}
      <View style={styles.faqContainer}>
        <Text style={styles.faqTitle}>PREGUNTAS FRECUENTES</Text>
        <View style={styles.faqGrid}>
          {faqs.map((faq) => (
            <TouchableOpacity key={faq.id} style={styles.faqItem}>
              <Text style={styles.faqQuestion}>
                {faq.pregunta}
                <Text style={styles.arrow}>›</Text>
              </Text>
            </TouchableOpacity>
          ))}
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
  faqContainer: {
    flexGrow: 1,
    maxWidth: 1200,
    margin: 20,
    padding: 10,
  },
  faqTitle: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 24,
  },
  faqGrid: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  faqItem: {
    borderWidth: 1,
    borderColor: "#ff4081",
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
    width: "48%",
    cursor: "pointer",
  },
  faqItemHover: {
    backgroundColor: "#fff5f8",
  },
  faqQuestion: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 0,
    fontSize: 18,
  },
  arrow: {
    fontSize: 18,
  },
});

export default PreguntasFrecuentes;