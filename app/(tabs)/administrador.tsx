import React from "react";
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

const personnelData = [
  { id: 1, name: "Gabriel Andrés Duque", role: "Gerente", status: "Activo" },
  { id: 2, name: "Freyman Viviescas", role: "Soporte", status: "Activo" },
  { id: 3, name: "Jeyler Valencia", role: "Dt. Marketing", status: "Activo" },
  { id: 4, name: "Karol Lemos Segura", role: "Secretaría", status: "Activo" },
];

const PersonnelManagement = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      
      <View style={styles.header}>
        <Image source={require("@/assets/images/logos/logo.png")} style={styles.logo} />
        <TextInput placeholder="Search" style={styles.searchBar} />
      </View>
      
      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.buttonText}>Añadir personal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.buttonText}>Ver cuentas suspendidas</Text>
        </TouchableOpacity>
      </View>
      
      {/* Personnel List */}
      <ScrollView style={styles.personnelList}>
        {personnelData.map((person) => (
          <View key={person.id} style={styles.personnel}>
            <Image source={require("@/assets/images/Roles/administrador.png")} style={styles.personImage} />
            <View style={styles.details}>
              <Text>Usuario: {person.name}</Text>
              <Text>Cargo: {person.role}</Text>
              <Text>Estado: {person.status}</Text>
            </View>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.changeButton}>
                <Text style={styles.buttonText}>Cambiar cargo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.suspendButton}>
                <Text style={styles.buttonText}>Suspender perfil</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  logo: {
    height: 50,
    width: 100,
    resizeMode: "contain",
  },
  searchBar: {
    flex: 1,
    marginLeft: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  actionButton: {
    backgroundColor: "#007bff",
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  personnelList: {
    flex: 1,
  },
  personnel: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  personImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginRight: 15,
  },
  details: {
    flex: 1,
  },
  actionButtons: {
    flexDirection: "column",
  },
  changeButton: {
    backgroundColor: "#ffc107",
    padding: 5,
    borderRadius: 5,
    marginBottom: 5,
  },
  suspendButton: {
    backgroundColor: "#17a2b8",
    padding: 5,
    borderRadius: 5,
  },
});

export default PersonnelManagement;
