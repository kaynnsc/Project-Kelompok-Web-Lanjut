import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';

// helper function untuk membaca isi token JWT
function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      console.log("--- DATA DIKIRIM DARI FRONTEND ---");
      console.log("Email yang akan dikirim:", email);
      console.log("Password yang akan dikirim:", password);

      const res = await loginUser({ email, password });
      const { token } = res.data;
      
      // menyimpan token ke localStorage
      localStorage.setItem('token', token);

      // decode token untuk mendapatkan role
      const decodedToken = parseJwt(token);
      
      // mengarahkan pengguna berdasarkan role dari token
      if (decodedToken && decodedToken.role === 'admin') {
        navigate('/admin'); // mengarahkan ke dasbor admin
      } else {
        navigate('/dashboard'); // mengarahkan ke dasbor user biasa
      }

    } catch (err) {
      setError('Email atau password salah. Silakan coba lagi.');
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login Mahasiswa</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
        <div className="text-center mt-3">
          <p>
            Belum punya akun? <Link to="/register">Daftar di sini</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;