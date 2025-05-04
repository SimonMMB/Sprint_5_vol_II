import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSessionsByProgram } from '../../api/trainingSessionService';
import { getProgram } from '../../api/programService';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faHourglassHalf, faCalendarAlt, faDumbbell } from '@fortawesome/free-solid-svg-icons';

const TrainingSessionsList = () => {
  const { programId } = useParams();
  const [sessions, setSessions] = useState([]);
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Obtener el programa y sus sesiones
        const [programData, sessionsData] = await Promise.all([
          getProgram(programId),
          getSessionsByProgram(programId)
        ]);
        
        setProgram(programData);
        setSessions(sessionsData);
      } catch (err) {
        console.error('Error al cargar datos:', err);
        setError('No se pudieron cargar las sesiones de entrenamiento');
        toast.error('Error al cargar las sesiones');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [programId]);
  
  // Formatea la fecha en un formato legible
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      return format(parseISO(dateString), "d 'de' MMMM 'de' yyyy", { locale: es });
    } catch (error) {
      console.error('Error al formatear fecha:', error);
      return dateString;
    }
  };
  
  // Renderiza un indicador de estado con color
  const renderStatus = (status) => {
    if (status === 'completed') {
      return (
        <span className="px-2 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">
          <FontAwesomeIcon icon={faCheckCircle} className="mr-1" /> Completada
        </span>
      );
    } else {
      return (
        <span className="px-2 py-1 text-sm font-semibold rounded-full bg-yellow-100 text-yellow-800">
          <FontAwesomeIcon icon={faHourglassHalf} className="mr-1" /> Pendiente
        </span>
      );
    }
  };
  
  // Obtener el progreso del programa
  const getProgress = () => {
    if (!program) return 0;
    return program.completed_sessions > 0 
      ? Math.round((program.completed_sessions / program.total_sessions) * 100) 
      : 0;
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-6">
      {program && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Programa de Entrenamiento</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Frecuencia</p>
              <p className="text-lg font-semibold">{program.training_frequency} días por semana</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Duración</p>
              <p className="text-lg font-semibold">{program.training_duration} meses</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Fechas</p>
              <p className="text-lg font-semibold">
                {formatDate(program.start_date)} - {formatDate(program.estimated_end_date)}
              </p>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Progreso</h3>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="bg-blue-600 h-4 rounded-full" 
                style={{ width: `${getProgress()}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-1 text-sm text-gray-600">
              <span>{program.completed_sessions} de {program.total_sessions} sesiones completadas</span>
              <span>{getProgress()}%</span>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Sesiones de Entrenamiento</h2>
        
        {sessions.length === 0 ? (
          <div className="text-center py-8">
            <FontAwesomeIcon icon={faDumbbell} className="text-gray-300 text-5xl mb-4" />
            <p className="text-gray-500">No hay sesiones de entrenamiento disponibles</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">#</th>
                  <th className="py-3 px-6 text-left">Fecha Estimada</th>
                  <th className="py-3 px-6 text-left">Estado</th>
                  <th className="py-3 px-6 text-left">Ejercicios</th>
                  <th className="py-3 px-6 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {sessions.map((session) => (
                  <tr key={session.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left">{session.number_of_session}</td>
                    <td className="py-3 px-6 text-left">
                      <div className="flex items-center">
                        <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-gray-400" />
                        {formatDate(session.estimated_date)}
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">
                      {renderStatus(session.status)}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {session.session_exercises ? session.session_exercises.length : 0} ejercicios
                    </td>
                    <td className="py-3 px-6 text-center">
                      <Link 
                        to={`/training-sessions/${session.id}`}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-xs"
                      >
                        Ver Detalles
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainingSessionsList;