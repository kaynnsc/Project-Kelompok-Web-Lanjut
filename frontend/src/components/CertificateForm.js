import React, { useState } from 'react';
import { createEventCertificate } from '../services/api'; 

function CertificateForm({ onCertificateCreated }) { 
  const initialFormState = {
    nama_peserta: '',
    nim: '',
    nama_event: '',
    penyelenggara: '',
    tanggal_event: '',
    peran: 'Peserta',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // untuk konfirmasi form user
    const isConfirmed = window.confirm("Apakah form yang anda isi sudah benar?");
  
    // jika menekan yes dan ok maka proses akan berlanjut
    if (isConfirmed) {
      setLoading(true);
      setError('');
  
      if (!token) {
        setError('Sesi Anda telah berakhir, silakan login kembali.');
        setLoading(false);
        return;
      }
  
      try {
        await createEventCertificate(token, formData);
  
        // pemberitahuan untuk user
        alert('Pengajuan sertifikat berhasil dibuat!'); 
  
        // menggunakan parent untuk me-refresh daftar
        onCertificateCreated(); 
  
        // mengkosongkan form setelah berhasil
        setFormData(initialFormState);
  
      } catch (err) {
        setError('Gagal menyimpan sertifikat. Pastikan semua data terisi.');
        console.error(err);
      } finally {
        setLoading(false);
      }
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