import 'dotenv/config';
import type { ExpoConfig } from '@expo/config';

const config: ExpoConfig = {
  name: "MiFincaApp",
  slug: "MiFincaApp",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "myapp",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff"
  },
  ios: {
    supportsTablet: true
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff"
    }
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png"
  },
  plugins: [
    "expo-router",
    "expo-font"
  ],
  newArchEnabled: true,
  extra: {
    apiUrl: process.env.EXPO_PUBLIC_API_URL,
    apiRegisterUrl: process.env.EXPO_PUBLIC_API_URL_REGISTER,
    apiLoginUrl: process.env.EXPO_PUBLIC_API_URL_LOGIN,
    apiTokenUrl: process.env.EXPO_PUBLIC_API_URL_TOKEN,
    apiLogoutUrl: process.env.EXPO_PUBLIC_API_URL_LOGOUT,
    apiPerfilUrl: process.env.EXPO_PUBLIC_API_URL_PERFIL,
  }
};

export default config;