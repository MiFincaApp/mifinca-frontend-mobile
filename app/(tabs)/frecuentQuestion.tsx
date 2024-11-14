import React, { useState } from "react";
import { StyleSheet, View, Button, Text } from "react-native";

export default function PreguntasFrecuentes() {
    const [mostrarPregunta, setMostrarPregunta] = useState(false);

    const PreguntaRegistrarse = () => {
        setMostrarPregunta(!mostrarPregunta); // Cambia el estado al presionar el botón
    };

    return (
        <View style={style.container}>
            <Button 
                title="¿Cómo me registro en la aplicación Mi-Finca?" 
                onPress={PreguntaRegistrarse} 
            />
            {mostrarPregunta && (
                <Text style={style.texto}>
                    Para registrarse en la aplicación, por favor haga click en el botón registrar,
                    y complete con el nombre que aparece en su documento de identidad, junto con 
                    su fecha de nacimiento, su correo y número de celular.
                </Text>
            )}
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    texto: {
        marginTop: 20,
        textAlign: "center",
        paddingHorizontal: 20,
        fontSize: 16,
    }
});
