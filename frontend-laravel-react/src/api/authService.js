import apiClient from './config';

// Variable para evitar acceso antes de inicialización
let initialized = false;

// Inicializar el servicio de autenticación
const initialize = () => {
  if (initialized) return;
  
  const token = localStorage.getItem('token');
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  
  initialized = true;
};

// Llamar a initialize inmediatamente
initialize();

/**
 * Realiza el inicio de sesión del usuario.
 * @param {Object} credentials - Credenciales del usuario
 * @param {string} credentials.email - Correo electrónico
 * @param {string} credentials.password - Contraseña
 * @returns {Promise} Promesa con la respuesta
 */
export const login = async (credentials) => {
  try {
    const response = await apiClient.post('/auth/login', credentials);
    
    console.log('Respuesta del servidor (login):', response.data);
    
    // Adaptar a diferentes formatos de respuesta posibles
    const token = response.data.token || response.data.access_token || response.data.data?.token;
    const userData = response.data.user || response.data.data?.user || response.data.data;
    
    if (token) {
      // Almacenar el token y la información del usuario en localStorage
      localStorage.setItem('token', token);
      
      if (userData) {
        localStorage.setItem('user', JSON.stringify(userData));
      }
      
      // Asegurarse de que el cliente API use el nuevo token
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      console.log('Login exitoso, token almacenado');
      return response.data;
    } else {
      console.error('La respuesta de login no contiene un token reconocible:', response.data);
      throw new Error('No se recibió un token de autenticación válido');
    }
  } catch (error) {
    console.error('Error en servicio de login:', error);
    throw error;
  }
};

/**
 * Registra un nuevo usuario en el sistema.
 * @param {Object} userData - Datos del usuario
 * @param {string} userData.name - Nombre completo
 * @param {string} userData.email - Correo electrónico
 * @param {string} userData.password - Contraseña
 * @param {string} userData.password_confirmation - Confirmación de contraseña
 * @returns {Promise} Promesa con la respuesta
 */
export const register = async (userData) => {
  try {
    const response = await apiClient.post('/auth/register', userData);
    
    console.log('Respuesta del servidor (registro):', response.data);
    
    // Adaptar a diferentes formatos de respuesta posibles
    const token = response.data.token || response.data.access_token || response.data.data?.token;
    const userInfo = response.data.user || response.data.data?.user || response.data.data;
    
    if (token) {
      // Almacenar el token y la información del usuario en localStorage
      localStorage.setItem('token', token);
      
      if (userInfo) {
        localStorage.setItem('user', JSON.stringify(userInfo));
      }
      
      // Asegurarse de que el cliente API use el nuevo token
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      console.log('Registro exitoso, token almacenado');
      return response.data;
    } else {
      console.error('La respuesta de registro no contiene un token reconocible:', response.data);
      throw new Error('No se recibió un token de autenticación válido');
    }
  } catch (error) {
    console.error('Error en servicio de registro:', error);
    throw error;
  }
};

/**
 * Cierra la sesión del usuario actual.
 * @returns {Promise} Promesa con la respuesta
 */
export const logout = async () => {
  try {
    // Llamar al endpoint de logout en la API si existe
    try {
      await apiClient.post('/auth/logout');
    } catch (apiError) {
      console.warn('Error al llamar al endpoint de logout:', apiError);
      // Continuamos con el logout local incluso si el API falla
    }
    
    // Eliminar el token y datos de usuario del almacenamiento local
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Eliminar el token de los headers
    delete apiClient.defaults.headers.common['Authorization'];
    
    console.log('Logout exitoso, token eliminado');
    
    return { success: true };
  } catch (error) {
    console.error('Error en servicio de logout:', error);
    
    // Incluso si la API falla, eliminamos los datos locales
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete apiClient.defaults.headers.common['Authorization'];
    
    throw error;
  }
};

/**
 * Verifica si el usuario está autenticado.
 * @returns {boolean} True si el usuario está autenticado
 */
export const isAuthenticated = () => {
  // Asegurarse de que el servicio está inicializado
  initialize();
  
  try {
    const token = localStorage.getItem('token');
    
    // Asegurarse de que el token esté en los headers si existe
    if (token) {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error al verificar autenticación:', error);
    return false;
  }
};

/**
 * Obtiene el usuario actualmente logueado.
 * @returns {Object|null} Usuario o null si no hay usuario logueado
 */
export const getCurrentUser = () => {
  try {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    
    return JSON.parse(userStr);
  } catch (error) {
    console.error('Error al obtener usuario actual:', error);
    return null;
  }
};

/**
 * Verifica si el usuario actual tiene un rol específico.
 * @param {string|string[]} roles - Rol o array de roles a verificar
 * @returns {boolean} True si el usuario tiene el rol
 */
export const hasRole = (roles) => {
  try {
    const user = getCurrentUser();
    if (!user) return false;
    
    // Si el usuario tiene un array de roles
    if (user.roles) {
      if (Array.isArray(roles)) {
        return roles.some(role => user.roles.includes(role));
      }
      return user.roles.includes(roles);
    }
    
    // Si el usuario tiene un solo rol como propiedad
    if (user.role) {
      if (Array.isArray(roles)) {
        return roles.includes(user.role);
      }
      return user.role === roles;
    }
    
    return false;
  } catch (error) {
    console.error('Error al verificar rol:', error);
    return false;
  }
};

export default {
  login,
  register,
  logout,
  isAuthenticated,
  getCurrentUser,
  hasRole
};