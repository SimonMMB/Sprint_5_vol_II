import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProgram } from '../../api/programService';
import { toast } from 'react-toastify';

const CreateProgramForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    training_frequency: 3, // Por defecto, 3 días por semana
    training_duration: 3,  // Por defecto, 3 meses
    start_date: new Date().toISOString().split('T')[0],
    estimated_end_date: ''
  });

  // Calcula la fecha de finalización estimada basada en la duración y fecha de inicio
  const calculateEndDate = (startDate, months) => {
    const date = new Date(startDate);
    date.setMonth(date.getMonth() + parseInt(months));
    return date.toISOString().split('T')[0];
  };

  // Maneja cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    let newFormData = { ...formData, [name]: value };
    
    // Si cambia la fecha de inicio o la duración, recalcular la fecha de finalización
    if (name === 'start_date' || name === 'training_duration') {
      newFormData.estimated_end_date = calculateEndDate(
        name === 'start_date' ? value : formData.start_date,
        name === 'training_duration' ? value : formData.training_duration
      );
    }
    
    setFormData(newFormData);
  };

  // Maneja envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await createProgram(formData);
      toast.success('Programa de entrenamiento creado con éxito');
      navigate(`/programs/${result.id}`);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error al crear el programa';
      toast.error(errorMessage);
      console.error('Error al crear programa:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
      <h2 className="text-xl font-bold mb-4">Crear Nuevo Programa de Entrenamiento</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Frecuencia de entrenamiento (días por semana)
          </label>
          <select
            name="training_frequency"
            value={formData.training_frequency}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="1">1 día / semana</option>
            <option value="2">2 días / semana</option>
            <option value="3">3 días / semana</option>
            <option value="4">4 días / semana</option>
            <option value="5">5 días / semana</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Duración del programa (meses)
          </label>
          <select
            name="training_duration"
            value={formData.training_duration}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="1">1 mes</option>
            <option value="2">2 meses</option>
            <option value="3">3 meses</option>
            <option value="6">6 meses</option>
            <option value="12">12 meses</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Fecha de inicio
          </label>
          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Fecha estimada de finalización
          </label>
          <input
            type="date"
            name="estimated_end_date"
            value={formData.estimated_end_date}
            readOnly
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-100 leading-tight"
          />
          <p className="text-xs text-gray-500 mt-1">
            (Calculada automáticamente según la duración)
          </p>
        </div>
        
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            {loading ? 'Creando...' : 'Crear Programa'}
          </button>
          
          <button
            type="button"
            onClick={() => navigate('/programs')}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProgramForm;