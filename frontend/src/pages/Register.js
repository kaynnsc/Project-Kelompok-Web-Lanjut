// src/pages/Register.js
import React, { useState } from 'react';

function Register() {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    console.log({ nama, email, password });
  };

  return (
    <div className="container mt-5">
      <h2>Daftar Akun</h2>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label>Nama Lengkap</label>
          <input type="text" className="form-control" value={nama} onChange={(e) => setNama(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-success">Daftar</button>
      </form>
    </div>
  );
}

export default Register;