// src/api/config.js
import axios from 'axios';

// Configuración base de axios
const API_URL = 'http://localhost:8000/api'; // Ajusta esto a la URL de tu API

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Interceptor para añadir el token en las peticiones
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;