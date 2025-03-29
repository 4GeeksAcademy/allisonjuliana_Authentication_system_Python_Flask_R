import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Context } from '../store/appContext';

const ProtectedPrivate = ({ children }) => {
  const { store } = useContext(Context);

  // Verifica si el usuario está autenticado
  if (!store.registrationSuccess) {
    // Si no está autenticado, redirige al login
    return <Navigate to="/login" />;
  }

  // Si está autenticado, permite el acceso a la página privada
  return children;
};

export default ProtectedPrivate;
