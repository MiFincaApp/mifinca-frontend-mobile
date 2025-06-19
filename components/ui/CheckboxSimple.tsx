import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  checked: boolean;
  onToggle: () => void;
}

export default function CheckboxSimple({ checked, onToggle }: Props) {
  return (
    <TouchableOpacity onPress={onToggle}>
      <View style={[styles.checkbox, checked && styles.checked]}>
        {checked && <Ionicons name="checkmark" size={16} color="#fff" />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1.5,
    borderColor: "#ccc",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginRight: 10,
  },
  checked: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
});
