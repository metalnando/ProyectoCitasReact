import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // Si no se encuentra logueado, redirigir al usuario a la página de inicio de sesión, se deja retornando en children para pruebas
  if (!isAuthenticated) {
    //return <Navigate to="/login" replace />;
    return children;
}

   //si se encuentra logueado, retornar al children 
  return children;
};



export default PrivateRoute;