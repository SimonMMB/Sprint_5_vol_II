// src/App.jsx (versión final completa)
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AlertProvider } from './context/AlertContext';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import DashboardPage from './pages/Dashboard';
import ProgramsPage from './pages/Programs';
import ProgramDetailPage from './pages/ProgramDetail';
import CreateProgramPage from './pages/CreateProgram';
import EditProgramPage from './pages/EditProgram';
import SessionsPage from './pages/Sessions';
import SessionDetailPage from './pages/SessionDetail';
import CreateSessionPage from './pages/CreateSession';
import EditSessionPage from './pages/EditSession';
import NotFoundPage from './pages/NotFound';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <AlertProvider>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Rutas protegidas */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
          
          {/* Rutas para Programas */}
          <Route path="/programs" element={
            <ProtectedRoute>
              <ProgramsPage />
            </ProtectedRoute>
          } />
          <Route path="/programs/create" element={
            <ProtectedRoute>
              <CreateProgramPage />
            </ProtectedRoute>
          } />
          <Route path="/programs/:id" element={
            <ProtectedRoute>
              <ProgramDetailPage />
            </ProtectedRoute>
          } />
          <Route path="/programs/:id/edit" element={
            <ProtectedRoute>
              <EditProgramPage />
            </ProtectedRoute>
          } />
          
          {/* Rutas para Sesiones */}
          <Route path="/sessions" element={
            <ProtectedRoute>
              <SessionsPage />
            </ProtectedRoute>
          } />
          <Route path="/programs/:programId/sessions" element={
            <ProtectedRoute>
              <SessionsPage />
            </ProtectedRoute>
          } />
          <Route path="/sessions/create" element={
            <ProtectedRoute>
              <CreateSessionPage />
            </ProtectedRoute>
          } />
          <Route path="/programs/:programId/sessions/create" element={
            <ProtectedRoute>
              <CreateSessionPage />
            </ProtectedRoute>
          } />
          <Route path="/sessions/:id" element={
            <ProtectedRoute>
              <SessionDetailPage />
            </ProtectedRoute>
          } />
          <Route path="/sessions/:id/edit" element={
            <ProtectedRoute>
              <EditSessionPage />
            </ProtectedRoute>
          } />

          {/* Ruta para página no encontrada */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AlertProvider>
    </AuthProvider>
  );
}

export default App;