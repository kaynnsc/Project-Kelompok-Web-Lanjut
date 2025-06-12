// src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Kirim permintaan login ke backend
      const res = await axios.post('/api/auth/login', { email, password });

      // Simpan token di localStorage
      localStorage.setItem('token', res.data.token);

      // Tampilkan notifikasi sukses
      toast.success('Login berhasil!', { autoClose: 1500 });

      // Arahkan ke dashboard setelah 1.5 detik
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      // Tampilkan error jika login gagal
      toast.error(err.response?.data?.message || 'Login gagal. Periksa email atau password.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>

      <p className="mt-3">
        Belum punya akun? <a href="/register">Daftar di sini</a>
      </p>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
}

export default Login;