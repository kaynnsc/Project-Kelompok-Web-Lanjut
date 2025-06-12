import React, { useState } from 'react';
import { createEventCertificate } from '../services/api'; 
import { useNavigate } from 'react-router-dom';

function CertificateForm() {
  const [formData, setFormData] = useState({
    nama_peserta: '',
    nim: '',
    nama_event: '',
    penyelenggara: '',
    tanggal_event: '',
    peran: 'Peserta', // Default role
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await createEventCertificate(token, formData);

      alert('Sertifikat event berhasil dibuat!');
      navigate('/dashboard'); 

    } catch (err) {
      setError('Gagal menyimpan sertifikat. Pastikan Anda sudah login dan coba lagi.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow-sm p-4 mb-5 bg-body rounded">
      <h3 className="mb-4">Isi Data Sertifikat Event</h3>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nama Peserta</label>
          <input type="text" name="nama_peserta" className="form-control" value={formData.nama_peserta} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">NIM</label>
          <input type="text" name="nim" className="form-control" value={formData.nim} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Nama Event</label>
          <input type="text" name="nama_event" className="form-control" value={formData.nama_event} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Penyelenggara Event</label>
          <input type="text" name="penyelenggara" className="form-control" value={formData.penyelenggara} onChange={handleChange} required />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Peran</label>
          <select name="peran" className="form-select" value={formData.peran} onChange={handleChange}>
            <option value="Peserta">Peserta</option>
            <option value="Panitia">Panitia</option>
            <option value="Pembicara">Pembicara</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Tanggal Event</label>
          <input type="date" name="tanggal_event" className="form-control" value={formData.tanggal_event} onChange={handleChange} required />
        </div>

        <button type="submit" className="btn btn-success w-100" disabled={loading}>
          {loading ? 'Menyimpan...' : 'Simpan & Buat Sertifikat'}
        </button>
      </form>
    </div>
  );
}

export default CertificateForm;