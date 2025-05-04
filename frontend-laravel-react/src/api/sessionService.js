// src/api/sessionService.js
import apiClient from './config';

// Datos de ejemplo para trabajar sin la API real
const mockSessions = [
  {
    id: 1,
    program_id: 1,
    name: 'Día 1: Entrenamiento de piernas',
    description: 'Enfocado en cuadriceps, isquiotibiales y glúteos',
    duration_minutes: 60,
    created_at: '2025-01-15',
    exercises: [
      { id: 1, name: 'Sentadillas', sets: 4, reps: 10, weight: 70 },
      { id: 2, name: 'Peso muerto', sets: 3, reps: 8, weight: 80 },
      { id: 3, name: 'Extensiones de pierna', sets: 3, reps: 12, weight: 40 }
    ]
  },
  {
    id: 2,
    program_id: 1,
    name: 'Día 2: Pecho y espalda',
    description: 'Enfocado en pectorales y dorsales',
    duration_minutes: 55,
    created_at: '2025-01-17',
    exercises: [
      { id: 4, name: 'Press de banca', sets: 4, reps: 8, weight: 60 },
      { id: 5, name: 'Dominadas', sets: 3, reps: 10, weight: 0 },
      { id: 6, name: 'Remo con barra', sets: 3, reps: 12, weight: 50 }
    ]
  },
  {
    id: 3,
    program_id: 2,
    name: 'Cardio intensivo',
    description: 'Sesión de alta intensidad para mejorar capacidad cardiovascular',
    duration_minutes: 45,
    created_at: '2025-01-20',
    exercises: [
      { id: 7, name: 'Sprint en cinta', sets: 10, reps: 1, weight: 0 },
      { id: 8, name: 'Burpees', sets: 3, reps: 15, weight: 0 },
      { id: 9, name: 'Salto a la comba', sets: 3, reps: 50, weight: 0 }
    ]
  }
];

export const getSessions = async (programId) => {
  // Simulación: en una implementación real, esto sería:
  // return apiClient.get(`/programs/${programId}/training-sessions`);
  
  const sessions = programId 
    ? mockSessions.filter(s => s.program_id === parseInt(programId))
    : mockSessions;
  
  return Promise.resolve({ data: sessions });
};

export const getSession = async (id) => {
  // Simulación: en una implementación real, esto sería:
  // return apiClient.get(`/training-sessions/${id}`);
  
  const session = mockSessions.find(s => s.id === parseInt(id));
  return Promise.resolve({ data: session });
};

export const createSession = async (sessionData) => {
  // Simulación: en una implementación real, esto sería:
  // return apiClient.post('/training-sessions', sessionData);
  
  const newSession = {
    id: mockSessions.length + 1,
    ...sessionData,
    created_at: new Date().toISOString().split('T')[0],
    exercises: []
  };
  mockSessions.push(newSession);
  return Promise.resolve({ data: newSession });
};

export const updateSession = async (id, sessionData) => {
  // Simulación: en una implementación real, esto sería:
  // return apiClient.patch(`/training-sessions/${id}`, sessionData);
  
  const index = mockSessions.findIndex(s => s.id === parseInt(id));
  if (index !== -1) {
    mockSessions[index] = { 
      ...mockSessions[index], 
      ...sessionData,
      id: parseInt(id)  // Aseguramos que el ID no cambie
    };
    return Promise.resolve({ data: mockSessions[index] });
  }
  return Promise.reject(new Error('Sesión no encontrada'));
};

export const deleteSession = async (id) => {
  // Simulación: en una implementación real, esto sería:
  // return apiClient.delete(`/training-sessions/${id}`);
  
  const index = mockSessions.findIndex(s => s.id === parseInt(id));
  if (index !== -1) {
    mockSessions.splice(index, 1);
    return Promise.resolve({ success: true });
  }
  return Promise.reject(new Error('Sesión no encontrada'));
};

// Método para añadir un ejercicio a una sesión
export const addExerciseToSession = async (sessionId, exerciseData) => {
  // Simulación: en una implementación real, esto sería:
  // return apiClient.post(`/training-sessions/${sessionId}/exercises`, exerciseData);
  
  const sessionIndex = mockSessions.findIndex(s => s.id === parseInt(sessionId));
  if (sessionIndex !== -1) {
    const newExercise = {
      id: mockSessions[sessionIndex].exercises?.length 
          ? Math.max(...mockSessions[sessionIndex].exercises.map(e => e.id)) + 1 
          : 1,
      ...exerciseData
    };
    
    // Si la sesión no tiene un array de ejercicios, lo creamos
    if (!mockSessions[sessionIndex].exercises) {
      mockSessions[sessionIndex].exercises = [];
    }
    
    mockSessions[sessionIndex].exercises.push(newExercise);
    return Promise.resolve({ data: newExercise });
  }
  return Promise.reject(new Error('Sesión no encontrada'));
};

// Método para actualizar un ejercicio específico
export const updateSessionExercise = async (sessionId, exerciseId, exerciseData) => {
  // Simulación: en una implementación real, esto sería:
  // return apiClient.patch(`/training-sessions/${sessionId}/exercises/${exerciseId}`, exerciseData);
  
  const sessionIndex = mockSessions.findIndex(s => s.id === parseInt(sessionId));
  if (sessionIndex !== -1) {
    const exerciseIndex = mockSessions[sessionIndex].exercises?.findIndex(e => e.id === parseInt(exerciseId));
    
    if (exerciseIndex !== -1 && exerciseIndex !== undefined) {
      mockSessions[sessionIndex].exercises[exerciseIndex] = {
        ...mockSessions[sessionIndex].exercises[exerciseIndex],
        ...exerciseData,
        id: parseInt(exerciseId) // Aseguramos que el ID no cambie
      };
      return Promise.resolve({ data: mockSessions[sessionIndex].exercises[exerciseIndex] });
    }
    return Promise.reject(new Error('Ejercicio no encontrado'));
  }
  return Promise.reject(new Error('Sesión no encontrada'));
};

// Método para eliminar un ejercicio
export const deleteSessionExercise = async (sessionId, exerciseId) => {
  // Simulación: en una implementación real, esto sería:
  // return apiClient.delete(`/training-sessions/${sessionId}/exercises/${exerciseId}`);
  
  const sessionIndex = mockSessions.findIndex(s => s.id === parseInt(sessionId));
  if (sessionIndex !== -1) {
    const exerciseIndex = mockSessions[sessionIndex].exercises?.findIndex(e => e.id === parseInt(exerciseId));
    
    if (exerciseIndex !== -1 && exerciseIndex !== undefined) {
      mockSessions[sessionIndex].exercises.splice(exerciseIndex, 1);
      return Promise.resolve({ success: true });
    }
    return Promise.reject(new Error('Ejercicio no encontrado'));
  }
  return Promise.reject(new Error('Sesión no encontrada'));
};

export default {
  getSessions,
  getSession,
  createSession,
  updateSession,
  deleteSession,
  addExerciseToSession,
  updateSessionExercise,
  deleteSessionExercise
};