import api from '../services/api'; // Axios configurado

export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data; // {user, token}
};

export const login = async (credentials) => {
  const response = await api.post('/auth/login', {
    email: credentials.email,
    password: credentials.password
  });
  return response.data; // {user, token}
};

export const logout = async () => {
  await api.post('/auth/logout');
};