// src/api/sessionService.js
import apiClient from './config';

// Datos de ejemplo
const mockSessions = [
  {
    id: 1,
    program_id: 1,
    name: 'Día 1: Entrenamiento de piernas',
    description: 'Enfocado en cuadriceps, isquiotibiales y glúteos',
    duration_minutes: 60,
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
    exercises: [
      { id: 4, name: 'Press de banca', sets: 4, reps: 8, weight: 60 },
      { id: 5, name: 'Dominadas', sets: 3, reps: 10, weight: 0 },
      { id: 6, name: 'Remo con barra', sets: 3, reps: 12, weight: 50 }
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
    mockSessions[index] = { ...mockSessions[index], ...sessionData };
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