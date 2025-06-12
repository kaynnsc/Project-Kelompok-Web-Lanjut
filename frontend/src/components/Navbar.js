// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username'); // Bisa dari profil user setelah login

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
    window.location.reload(); // Refresh halaman agar navbar berubah
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        {/* Logo / Brand */}
        <Link className="navbar-brand" to="/">E-Sertifikat Imunisasi</Link>

        {/* Menu Navigasi */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Beranda</Link>
            </li>
            {token && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/riwayat">Riwayat Sertifikat</Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Tombol Login / Profil & Logout */}
        <div className="d-flex align-items-center">
          {token ? (
            <div className="dropdown">
              <button
                className="btn btn-light dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Halo, {username || 'Pengguna'}
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><Link className="dropdown-item" to="/profile">Profil</Link></li>
                <li><Link className="dropdown-item" to="/dashboard">Dashboard</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button className="dropdown-item text-danger" onClick={handleLogout}>
                    Keluar
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="btn btn-light">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;