// src/components/CertificateForm.js
import React, { useState } from 'react';
import { createCertificate } from '../../services/api';
import { useNavigate } from 'react-router-dom';

function CertificateForm() {
  const [formData, setFormData] = useState({
    nama: '',
    nik: '',
    jenis_vaksin: '',
    tanggal_pemberian: ''
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
      // Kirim data ke backend
      const res = await createCertificate(token, formData);

      // Tampilkan pesan sukses dan navigasi ke dashboard atau download PDF
      alert('Sertifikat berhasil dibuat!');
      navigate('/dashboard');

      // Optional: langsung generate PDF jika ada endpoint generate
      // window.open(`${process.env.REACT_APP_API_URL}/sertifikat/generate/${res.data._id}`);

    } catch (err) {
      setError('Gagal menyimpan sertifikat. Silakan coba lagi.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow-sm p-4 mb-5 bg-body rounded">
      <h3 className="mb-4">Isi Data Imunisasi</h3>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nama Lengkap</label>
          <input
            type="text"
            name="nama"
            className="form-control"
            value={formData.nama}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">NIK</label>
          <input
            type="text"
            name="nik"
            className="form-control"
            value={formData.nik}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Jenis Vaksin</label>
          <input
            type="text"
            name="jenis_vaksin"
            className="form-control"
            value={formData.jenis_vaksin}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Tanggal Pemberian</label>
          <input
            type="date"
            name="tanggal_pemberian"
            className="form-control"
            value={formData.tanggal_pemberian}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-success w-100"
          disabled={loading}
        >
          {loading ? 'Menyimpan...' : 'Simpan & Generate PDF'}
        </button>
      </form>
    </div>
  );
}

export default CertificateForm;