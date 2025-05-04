// src/api/authService.js
import apiClient from './config';

// Por ahora, simulamos la respuesta para no depender de la API real
const mockUserData = {
  id: 1,
  name: 'Usuario Ejemplo',
  email: 'usuario@ejemplo.com'
};

export const login = async (credentials) => {
  // Simulación: en una implementación real, esto sería:
  // return apiClient.post('/auth/login', credentials);
  
  return Promise.resolve({
    token: 'mock-token-123456',
    user: mockUserData
  });
};

export const register = async (userData) => {
  // Simulación: en una implementación real, esto sería:
  // return apiClient.post('/auth/register', userData);
  
  return Promise.resolve({
    token: 'mock-token-123456',
    user: mockUserData
  });
};

export const logout = async () => {
  // Simulación: en una implementación real, esto sería:
  // return apiClient.post('/auth/logout');
  
  localStorage.removeItem('auth_token');
  return Promise.resolve({ success: true });
};

export const getCurrentUser = async () => {
  // Simulación: en una implementación real, esto sería:
  // return apiClient.get('/auth/me');
  
  return Promise.resolve(mockUserData);
};