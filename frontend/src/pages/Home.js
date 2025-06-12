import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container text-center mt-5">
      <h1>Portal E-Sertifikat Event Mahasiswa</h1>
      <p>Kelola dan Unduh Sertifikat Event Anda dengan Mudah</p>
      <Link to="/login" className="btn btn-primary me-2">Login</Link>
      <Link to="/register" className="btn btn-outline-primary">Daftar</Link>
    </div>
  );
}

export default Home;