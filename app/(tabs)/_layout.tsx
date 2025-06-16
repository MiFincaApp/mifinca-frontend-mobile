import { Slot } from 'expo-router';
import { View, StyleSheet, Keyboard, Platform } from 'react-native';
import Footer from '@/components/footer/footer';
import { useEffect, useState } from 'react';

export default function TabsLayout() {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hide = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Slot />
      </View>

      {!keyboardVisible && <Footer />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});