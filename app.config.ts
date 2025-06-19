import 'dotenv/config';
import type { ExpoConfig } from '@expo/config';

const config: ExpoConfig = {
  name: "MiFincaApp",
  slug: "MiFincaApp",
  scheme: "mifincaapp",
  platforms: ["android"],
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/logos/logo.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/images/logos/logo.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/logos/LogoMiFinca.png",
      backgroundColor: "#ffffff",
    },
    package: "com.mifincaapp",
    permissions: [],
  },
  web: {
    favicon: "./assets/images/logos/LogoMiFincaApp.png",
  },
  plugins: [
    "expo-router",
    "expo-font"
  ],
  newArchEnabled: true,
  extra: {
    // Apis Fincas
    apiUrlFincas: process.env.EXPO_PUBLIC_API_URL_FINCAS,
    apiUrlCrearFinca: process.env.EXPO_PUBLIC_API_URL_CREAR_FINCA,

    // Apis informes
    apiUrlInformeComprador: process.env.EXPO_PUBLIC_API_URL_INFORMES_COMPRADOR,
    apiUrlInformeCampesino: process.env.EXPO_PUBLIC_API_URL_INFORMES_CAMPESINO,
    
    // Apis Productos
    apiUrlProducts: process.env.EXPO_PUBLIC_API_URL_PRODUCTS,
    apiUrlFilterProducts: process.env.EXPO_PUBLIC_API_URL_FILTER_PRODUCTS,
    apiUrlProductDetail: process.env.EXPO_PUBLIC_API_URL_PRODUCT_ID,
    apiUrlProductCreate: process.env.EXPO_PUBLIC_API_URL_CREATE_PRODUCT,
    apiUrlProductUpdate: process.env.EXPO_PUBLIC_API_URL_PRODUCT_UPDATE,
    apiUrlProductDelete: process.env.EXPO_PUBLIC_API_URL_PRODUCT_DELETE,

    // Authentication URLs
    apiRegisterUrl: process.env.EXPO_PUBLIC_API_URL_REGISTER,
    apiLoginUrl: process.env.EXPO_PUBLIC_API_URL_LOGIN,
    apiTokenUrl: process.env.EXPO_PUBLIC_API_URL_TOKEN,
    apiLogoutUrl: process.env.EXPO_PUBLIC_API_URL_LOGOUT,
    apiPerfilUrl: process.env.EXPO_PUBLIC_API_URL_PERFIL,

    // Apis ventas
    apiUrlVentas: process.env.EXPO_PUBLIC_API_URL_VENTAS,

    // Apis Pagos
    apiUrlWompi: process.env.EXPO_PUBLIC_API_URL_PAGOS,
  }
};

export default config;