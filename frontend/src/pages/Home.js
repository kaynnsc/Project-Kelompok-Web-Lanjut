// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container text-center mt-5">
      <h1>Selamat Datang di E-Sertifikat Imunisasi</h1>
      <p>Mudah, Cepat, dan Terpercaya</p>
      <Link to="/login" className="btn btn-primary me-2">Login</Link>
      <Link to="/register" className="btn btn-outline-primary">Daftar</Link>
    </div>
  );
}

export default Home;