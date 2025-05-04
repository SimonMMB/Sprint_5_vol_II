import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isAuthenticated } from './api/authService';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Mostrar el Navbar solo si el usuario está autenticado */}
      {isAuthenticated() && <Navbar />}
      
      <main className="flex-grow">
        <AppRoutes />
      </main>
      
      <Footer />
      
      {/* Configuración del sistema de notificaciones toast */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;