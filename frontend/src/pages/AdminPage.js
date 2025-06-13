import React, { useState, useEffect } from 'react';
import { getPendingCertificates, verifyCertificate } from '../services/api';

function AdminPage() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  // fungsi untuk mengambil data dari backend
  const fetchPendingCertificates = async () => {
    if (!token) {
      setError('Token tidak ditemukan, silahkan login ulang.');
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const res = await getPendingCertificates(token);
      setCertificates(res.data);
    } catch (err) {
      console.error("Gagal mengambil data pengajuan:", err);
      setError('Gagal memuat data dari server.');
    } finally {
      setLoading(false);
    }
  };

  // panggil fungsi fetch saat komponen pertama kali dimuat
  useEffect(() => {
    fetchPendingCertificates();
  }, []);

  const handleVerification = async (id, status) => {
    try {
      // panggil API untuk verifikasi
      await verifyCertificate(token, id, status);

      // hapus sertifikat yang sudah diproses dari daftar di tampilan
      setCertificates(currentCertificates => 
        currentCertificates.filter(cert => cert._id !== id)
      );

      alert(`Sertifikat telah berhasil di-${status}!`);
    } catch (err) {
      console.error(`Gagal melakukan verifikasi:`, err);
      alert('Gagal memproses permintaan.');
    }
  };

  if (loading) {
    return <div className="container mt-5"><p>Memuat data...</p></div>;
  }

  if (error) {
    return <div className="container mt-5"><div className="alert alert-danger">{error}</div></div>;
  }

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>
      <p>Verifikasi Pengajuan Sertifikat Event</p>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Nama Peserta</th>
                  <th>NIM</th>
                  <th>Nama Event</th>
                  <th>Tanggal</th>
                  <th>Peran</th>
                  <th className="text-center">Tindakan</th>
                </tr>
              </thead>
              <tbody>
                {certificates.length > 0 ? (
                  certificates.map((cert) => (
                    <tr key={cert._id}>
                      <td>{cert.nama_peserta}</td>
                      <td>{cert.nim}</td>
                      <td>
                        <strong>{cert.nama_event}</strong><br/>
                        <small className="text-muted">{cert.penyelenggara}</small>
                      </td>
                      <td>{new Date(cert.tanggal_event).toLocaleDateString('id-ID')}</td>
                      <td><span className="badge bg-secondary">{cert.peran}</span></td>
                      <td className="text-center">
                        <button 
                          className="btn btn-success btn-sm me-2"
                          onClick={() => handleVerification(cert._id, 'approved')}
                        >
                          Terima
                        </button>
                        <button 
                          className="btn btn-danger btn-sm"
                          onClick={() => handleVerification(cert._id, 'rejected')}
                        >
                          Tolak
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center p-4">
                      Tidak ada pengajuan yang perlu diverifikasi.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;