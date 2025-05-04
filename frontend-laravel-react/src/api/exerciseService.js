// src/api/exerciseService.js
import apiClient from './config';

// Datos de ejemplo para los ejercicios
const mockExercises = [
  { id: 1, session_id: 1, name: 'Sentadillas', sets: 4, reps: 10, weight: 70 },
  { id: 2, session_id: 1, name: 'Peso muerto', sets: 3, reps: 8, weight: 80 },
  { id: 3, session_id: 1, name: 'Extensiones de pierna', sets: 3, reps: 12, weight: 40 },
  { id: 4, session_id: 2, name: 'Press de banca', sets: 4, reps: 8, weight: 60 },
  { id: 5, session_id: 2, name: 'Dominadas', sets: 3, reps: 10, weight: 0 },
  { id: 6, session_id: 2, name: 'Remo con barra', sets: 3, reps: 12, weight: 50 }
];

export const getExercisesBySession = async (sessionId) => {
  // Simulación: en una implementación real, esto sería:
  // return apiClient.get(`/training-sessions/${sessionId}/exercises`);
  
  const exercises = mockExercises.filter(e => e.session_id === parseInt(sessionId));
  return Promise.resolve({ data: exercises });
};

export const createExercise = async (sessionId, exerciseData) => {
  // Simulación: en una implementación real, esto sería:
  // return apiClient.post(`/training-sessions/${sessionId}/exercises`, exerciseData);
  
  const newExercise = {
    id: mockExercises.length + 1,
    session_id: parseInt(sessionId),
    ...exerciseData
  };
  mockExercises.push(newExercise);
  return Promise.resolve({ data: newExercise });
};

export const updateExercise = async (sessionId, exerciseId, exerciseData) => {
  // Simulación: en una implementación real, esto sería:
  // return apiClient.patch(`/training-sessions/${sessionId}/exercises/${exerciseId}`, exerciseData);
  
  const index = mockExercises.findIndex(e => e.id === parseInt(exerciseId));
  if (index !== -1) {
    mockExercises[index] = { ...mockExercises[index], ...exerciseData };
    return Promise.resolve({ data: mockExercises[index] });
  }
  return Promise.reject(new Error('Ejercicio no encontrado'));
};

export const deleteExercise = async (sessionId, exerciseId) => {
  // Simulación: en una implementación real, esto sería:
  // return apiClient.delete(`/training-sessions/${sessionId}/exercises/${exerciseId}`);
  
  const index = mockExercises.findIndex(e => e.id === parseInt(exerciseId));
  if (index !== -1) {
    mockExercises.splice(index, 1);
    return Promise.resolve({ success: true });
  }
  return Promise.reject(new Error('Ejercicio no encontrado'));
};