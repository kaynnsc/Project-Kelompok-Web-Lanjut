// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">E-Sertifikat Imunisasi</Link>
        <button className="btn btn-light ms-auto">Login</button>
      </div>
    </nav>
  );
}

export default Navbar;