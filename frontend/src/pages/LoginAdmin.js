// src/pages/LoginAdmin.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginAdmin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/admin-login', { email, password });
      localStorage.setItem('adminToken', res.data.token);
      alert('Login admin berhasil');
      navigate('/admin-dashboard');
    } catch (err) {
      alert('Login gagal. Email atau password salah.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login Admin</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-warning">Login sebagai Admin</button>
      </form>
    </div>
  );
}

export default LoginAdmin;