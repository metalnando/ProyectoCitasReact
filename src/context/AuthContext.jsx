import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );
  const navigate = useNavigate();

 
  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
    localStorage.setItem('user', JSON.stringify(user));
  }, [isAuthenticated, user]);

  const login = (userData) => {
    
    console.log('Attempting login with:', userData);
    setIsAuthenticated(true);
    setUser(userData);
    navigate('/dashboard'); 
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    navigate('/login'); 
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);