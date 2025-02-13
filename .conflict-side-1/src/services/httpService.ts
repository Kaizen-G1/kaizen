import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import config from '../config/config';

const http: AxiosInstance = axios.create({
  baseURL: config.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor
http.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    // Display error
    console.error('API Error:', error.message);

    // Handle particular errors (optional)
    if (error.response) {
      console.error(`Error Status: ${error.response.status}`);
      console.error(`Error Data:`, error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    }

    return Promise.reject(error);
  }
);

export default http;
