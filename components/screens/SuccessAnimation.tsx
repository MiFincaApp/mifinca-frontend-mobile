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
        style={{ width: 200, height: 200 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'center' },
});