import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

export default function Error() {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('@/assets/animations/Error.json')}
        autoPlay
        loop
        style={styles.estadoAnimacion}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  estadoAnimacion: {
    width: 200,
    height: 200,
  },
});
