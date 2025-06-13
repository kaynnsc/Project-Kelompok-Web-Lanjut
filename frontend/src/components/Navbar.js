import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token'); 

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to={isLoggedIn ? "/dashboard" : "/"}>E-Sertifikat Event</Link>
        <div className="ms-auto">
          {isLoggedIn ? (
            <button onClick={handleLogout} className="btn btn-light">Logout</button>
          ) : (
            <Link to="/login" className="btn btn-light">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;