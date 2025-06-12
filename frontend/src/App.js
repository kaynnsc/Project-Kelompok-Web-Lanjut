import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home'; 
import Login from './pages/Login'; 
import Register from './pages/Register'; 
import Dashboard from './pages/Dashboard'; 

import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;