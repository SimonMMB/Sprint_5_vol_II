import { useState } from 'react';
import { register } from '../api/authService';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token, user } = await register(formData);
      localStorage.setItem('auth_token', token); // Guardamos el token
      alert(`¡Bienvenido ${user.name}!`);
    } catch (error) {
      alert('Error: ' + error.response?.data?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        placeholder="Nombre"
        required
      />
      {/* Resto de campos... */}
      <button type="submit">Registrarse</button>
    </form>
  );
};