// src/api/programService.js
import apiClient from './config';

// Datos de ejemplo para trabajar sin la API real
const mockPrograms = [
  { 
    id: 1, 
    name: 'Programa de fuerza', 
    description: 'Entrenamiento enfocado en ganancia de fuerza',
    duration_weeks: 12,
    type: 'strength',
    created_at: '2025-01-15'
  },
  { 
    id: 2, 
    name: 'Cardio intensivo', 
    description: 'Programa para mejorar resistencia cardiovascular',
    duration_weeks: 8,
    type: 'cardio',
    created_at: '2025-01-20'
  },
  { 
    id: 3, 
    name: 'Pérdida de peso', 
    description: 'Entrenamiento para reducir grasa corporal',
    duration_weeks: 16,
    type: 'weight-loss',
    created_at: '2025-02-05'
  }
];

export const getPrograms = async () => {
  // Simulación: en una implementación real, esto sería:
  // return apiClient.get('/programs');
  
  return Promise.resolve({ data: mockPrograms });
};

export const getProgram = async (id) => {
  // Simulación: en una implementación real, esto sería:
  // return apiClient.get(`/programs/${id}`);
  
  const program = mockPrograms.find(p => p.id === parseInt(id));
  return Promise.resolve({ data: program });
};

export const createProgram = async (programData) => {
  // Simulación: en una implementación real, esto sería:
  // return apiClient.post('/programs', programData);
  
  const newProgram = {
    id: mockPrograms.length + 1,
    ...programData,
    created_at: new Date().toISOString().split('T')[0]
  };
  mockPrograms.push(newProgram);
  return Promise.resolve({ data: newProgram });
};

export const updateProgram = async (id, programData) => {
  // Simulación: en una implementación real, esto sería:
  // return apiClient.patch(`/programs/${id}`, programData);
  
  const index = mockPrograms.findIndex(p => p.id === parseInt(id));
  if (index !== -1) {
    mockPrograms[index] = { ...mockPrograms[index], ...programData };
    return Promise.resolve({ data: mockPrograms[index] });
  }
  return Promise.reject(new Error('Programa no encontrado'));
};

export const deleteProgram = async (id) => {
  // Simulación: en una implementación real, esto sería:
  // return apiClient.delete(`/programs/${id}`);
  
  const index = mockPrograms.findIndex(p => p.id === parseInt(id));
  if (index !== -1) {
    mockPrograms.splice(index, 1);
    return Promise.resolve({ success: true });
  }
  return Promise.reject(new Error('Programa no encontrado'));
};