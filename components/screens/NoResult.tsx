import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

export default function NoResult() {
  return (
    <View style={styles.estadoContainer}>
      <LottieView
        source={require('@/assets/animations/NoResult.json')}
        autoPlay
        loop={false}
        style={styles.estadoAnimacion}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  estadoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  estadoAnimacion: {
    width: 200,
    height: 200,
  },
});