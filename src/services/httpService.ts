import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logger } from 'react-native-logs';
import config from "../config/config";
import API_ROUTES from "../api/apiRoutes";

const log = logger.createLogger();

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
    log.debug(`${config.method?.toUpperCase()}: ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

// Manejo de respuestas y errores
http.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    log.error("API Error:", error.message);

    if (error.config)  {
      log.error("Error URL:", error.config.url);
    }

    if (error.response) {
      log.error(`Error Status: ${error.response.status}`);
      log.error("Error Data:", error.response.data);

      // Si el token ha expirado, intentar refrescarlo
      if (error.response.status === 401) {
        log.debug("Token expired, attempting to refresh...");
        const newToken = await refreshAccessToken();
        
        if (newToken && error.config) {  // Asegurar que error.config existe
          error.config.headers = error.config.headers || {}; // Asegurar que headers existe
          error.config.headers.Authorization = `Bearer ${newToken}`;

          return http.request(error.config); // Reintentar la petición con el nuevo token
        }
      }
    } else if (error.request) {
      log.error("No response received:", error.request);
    }

    return Promise.reject(error);
  }
);


// Función para refrescar el token
const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    if (!refreshToken) {
      log.error("No refresh token found.");
      return null;
    }

    const response = await axios.post(API_ROUTES.auth.refreshToken, {
      refreshToken,
    });

    if (response.status === 200) {
      const { accessToken } = response.data;
      await AsyncStorage.setItem("accessToken", accessToken);
      return accessToken;
    }
  } catch (error) {
    log.error("Failed to refresh access token:", error);
  }

  return null;
};

export default http;
