import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'animate.css/animate.min.css';
import './index.css';

import { AuthProvider } from './context/AuthContext'; 
import NavbarOdonto from './components/NavbarOdonto';
import Footer from './components/Footer';


import HomeDentix from './pages/HomeDentix';
import HistorialClinico from './pages/HistorialClinico';
import Especialistas from './pages/Especialistas';
import Login from './pages/Login'; 
import AgendarCita from './pages/AgendarCita';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <AuthProvider> 
        <div className="app-container">
          <NavbarOdonto />
          <main>
            <Routes>
              <Route path="/" element={<HomeDentix />} />

              <Route path="/agendar-cita" element={<AgendarCita />} />
              <Route path="/historial" element={<HistorialClinico />} />
              <Route path="/especialistas" element={<Especialistas />} />

              <Route path="/login" element={<Login />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;