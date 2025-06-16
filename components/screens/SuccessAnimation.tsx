import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

export default function SuccessAnimationWeb() {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/animations/success.json')}
        autoPlay
        loop={false}
        style={{ width: 100, height: 100 }}
      />
      <Text style={styles.text}>¡Registro Exitoso!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'center' },
  text: { marginTop: 20, fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
});