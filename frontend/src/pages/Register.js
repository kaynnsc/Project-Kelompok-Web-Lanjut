import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { registerUser } from '../services/api';

function Register() {
  const [formData, setFormData] = useState({
    nama: '',
    nim: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { nama, nim, email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const userData = {
      name: nama, 
      nim,
      email,
      password,
    };

    try {
      const res = await registerUser(userData);

      setSuccess(res.data.message); 

    } catch (err) {
      console.error('Registration error:', err.response ? err.response.data : err);
      if (err.response && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Pendaftaran gagal. Silakan coba lagi.');
      }
    }
  };

  if (success) {
    return (
      <div className="container mt-5">
        <div className="alert alert-success">
          <h4>Pendaftaran Berhasil!</h4>
          <p>{success}</p>
          <Link to="/login" className="btn btn-primary">Kembali ke Halaman Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>Daftar Akun Mahasiswa</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label>Nama Lengkap</label>
          <input type="text" className="form-control" name="nama" value={nama} onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label>NIM</label>
          <input type="text" className="form-control" name="nim" value={nim} onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" name="email" value={email} onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" name="password" value={password} onChange={onChange} required minLength="6" />
        </div>
        <button type="submit" className="btn btn-success">Daftar</button>
      </form>
    </div>
  );
}

export default Register;