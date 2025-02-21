# MiFincaApp 🚜

Bienvenido al repositorio de **MiFincaApp**, un proyecto desarrollado con [Expo](https://expo.dev) y [React Native](https://reactnative.dev).

## 📌 Requisitos previos
Antes de clonar el proyecto, asegúrate de tener instaladas las siguientes herramientas:

- [Node.js](https://nodejs.org/) (versión recomendada: LTS)
- [Git](https://git-scm.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (Instalar con `npm install -g expo-cli`)
- Un emulador Android o un dispositivo físico con la app **Expo Go** instalada.

## 🚀 Instalación y ejecución
Sigue estos pasos para clonar y ejecutar el proyecto:

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/MiFincaApp.git
   cd MiFincaApp
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Limpiar caché de Expo (opcional pero recomendado):
   ```bash
   expo start -c
   ```

4. Iniciar el servidor de desarrollo:
   ```bash
   npx expo start
   ```

## 📱 Cómo ejecutar en un dispositivo

- Si usas un **emulador Android**, abre el emulador antes de ejecutar `expo start` y selecciona la opción "Run on Android device/emulator".
- Si usas **Expo Go**, escanea el código QR generado con la app en tu dispositivo.

## ❌ Posibles errores y soluciones

### 1. Error `Cannot find module '@expo/server/build/vendor/http'`
**Solución:**
```bash
rm -rf node_modules package-lock.json
npm install
expo start -c
```

### 2. Error `Module not found` o `Missing dependencies`
**Solución:**
```bash
npm install
expo doctor
```

## 🛠 Contribución
Si encuentras algún problema o tienes sugerencias, comunícate con el equipo o abre un issue en el repositorio.

📧 Contacto: [andresrubioduque@gmail.com]

¡Gracias por contribuir a **MiFincaApp**! 🚀
