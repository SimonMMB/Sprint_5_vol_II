// Vamos a crear context/AuthContext.jsx
import { createContext, useState, useEffect, useContext } from 'react';
import { login as loginService, logout as logoutService } from '../api/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Al cargar la aplicación, verificar si hay un token guardado
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      // Aquí podríamos hacer una petición a /auth/me para obtener los datos del usuario
      // Por ahora, simplemente establecemos que hay un usuario autenticado
      setUser({ authenticated: true });
    }
    setLoading(false);
  }, []);
  
  const login = async (credentials) => {
    const response = await loginService(credentials);
    localStorage.setItem('auth_token', response.token);
    setUser(response.user);
    return response;
  };
  
  const logout = async () => {
    await logoutService();
    localStorage.removeItem('auth_token');
    setUser(null);
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  return useContext(AuthContext);
};
