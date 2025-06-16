import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Header from '@/components/header/header';

const faqs = [
  {
    id: 1,
    pregunta: "¿Qué es un sistema de contenido?",
    respuesta: "Es una plataforma que permite gestionar, organizar y publicar contenido digital fácilmente. Mifincaapp usa un sistema que permite a los campesinos publicar productos y administrar su tienda."
  },
  {
    id: 2,
    pregunta: "¿Qué significa producto agotado?",
    respuesta: "Significa que un producto no está disponible en el inventario del campesino. Puedes esperar a que el vendedor lo reponga o buscar alternativas similares en la tienda."
  },
  {
    id: 3,
    pregunta: "¿Qué hacer si hay un problema con la transacción?",
    respuesta: "Contáctanos de inmediato vía WhatsApp. Guarda el número de transacción y la hora. Nuestro equipo te ayudará a resolver el inconveniente."
  },
  {
    id: 4,
    pregunta: "¿Qué hago si hay un problema con el funcionamiento de la página?",
    respuesta: "Puedes enviarnos una captura del error o describir el problema vía WhatsApp o correo. Nuestro equipo técnico revisará lo antes posible."
  },
  {
    id: 5,
    pregunta: "¿Debo alojar el sitio web de mi empresa en CMS Hub?",
    respuesta: "No es obligatorio. Mifincaapp ya gestiona la publicación y visibilidad de tu tienda. Sin embargo, si deseas un sitio web personalizado externo, puedes usar CMS Hub."
  },
  {
    id: 6,
    pregunta: "¿Qué tipo de ajustes puedo solicitar en el sistema?",
    respuesta: "Puedes solicitar ajustes en tus productos, imágenes, descripciones o precios. También puedes reportar errores o solicitar nuevas funcionalidades."
  },
  {
    id: 7,
    pregunta: "¿Con qué recursos puedo comenzar en Mifincaapp?",
    respuesta: "Puedes comenzar registrándote como campesino, subiendo tu primer producto con una imagen y descripción. También puedes revisar guías o preguntar a soporte para más ayuda."
  }
];

const PreguntasFrecuentes = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />

      <View style={styles.faqContainer}>
        <Text style={styles.faqTitle}>Preguntas Frecuentes</Text>
        <View style={styles.faqGrid}>
          {faqs.map((faq) => (
            <View key={faq.id} style={styles.faqItem}>
              <Text style={styles.faqQuestion}>
                {faq.pregunta}
              </Text>
              <Text style={styles.faqAnswer}>
                {faq.respuesta}
              </Text>
            </View>
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
  faqContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  faqTitle: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  faqGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  faqItem: {
    width: "48%",
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#4CAF50",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
});

export default PreguntasFrecuentes;