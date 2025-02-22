import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from "../config/config";

const http: AxiosInstance = axios.create({
  baseURL: config.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Agregar un interceptor para incluir el token en las peticiones
http.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Manejo de respuestas y errores
http.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    console.error("API Error:", error.message);

    if (error.response) {
      console.error(`Error Status: ${error.response.status}`);
      console.error("Error Data:", error.response.data);

      // Si el token ha expirado, intentar refrescarlo
      if (error.response.status === 401) {
        console.log("Token expired, attempting to refresh...");
        const newToken = await refreshAccessToken();
        
        if (newToken && error.config) {  // Asegurar que error.config existe
          error.config.headers = error.config.headers || {}; // Asegurar que headers existe
          error.config.headers.Authorization = `Bearer ${newToken}`;

          return http.request(error.config); // Reintentar la petición con el nuevo token
        }
      }
    } else if (error.request) {
      console.error("No response received:", error.request);
    }

    return Promise.reject(error);
  }
);


// Función para refrescar el token
const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    if (!refreshToken) {
      console.error("No refresh token found.");
      return null;
    }

    const response = await axios.post(`${config.API_URL}/api/v1/auth/refresh`, {
      refreshToken,
    });

    if (response.status === 200) {
      const { accessToken } = response.data;
      await AsyncStorage.setItem("accessToken", accessToken);
      return accessToken;
    }
  } catch (error) {
    console.error("Failed to refresh access token:", error);
  }

  return null;
};

export default http;
