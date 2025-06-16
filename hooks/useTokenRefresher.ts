import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

const useTokenRefresher = () => {
  useEffect(() => {
    const REFRESH_INTERVAL_MS = 5 * 60 * 1000; // cada 5 minutos

    const refreshTokenPeriodicamente = async () => {
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      const accessToken = await AsyncStorage.getItem("accessToken");

      // Api
      const apiUrl = Constants.expoConfig?.extra?.apiTokenUrl!;

      if (!apiUrl || !refreshToken || !accessToken) return;

      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`, // estándar
            "USER-MIFINCA-CLIENT": "mifincaapp-mobile-android", // personalizado
          },
          body: JSON.stringify({
            refreshToken: refreshToken,
          }),
        });

        const responseText = await response.text();
        let data;
        try {
          data = JSON.parse(responseText);
        } catch {
          data = null;
        }

        if (!response.ok || !data) {
          console.warn("⚠️ Error al refrescar token:", response.status);
          return;
        }

        const newAccessToken = data.accessToken;
        const newRefreshToken = data.refreshToken;

        if (newAccessToken && newRefreshToken) {
          await AsyncStorage.setItem("accessToken", newAccessToken);
          await AsyncStorage.setItem("refreshToken", newRefreshToken);
          console.log("✅ Token refrescado correctamente");
        } else {
          console.warn("⚠️ La API no devolvió nuevos tokens");
        }
      } catch (error) {
        console.error("❌ Error al llamar a la API de refresco:", error);
      }
    };

    const interval = setInterval(refreshTokenPeriodicamente, REFRESH_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);
};

export default useTokenRefresher;