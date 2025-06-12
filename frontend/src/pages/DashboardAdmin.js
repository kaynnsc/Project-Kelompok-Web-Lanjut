// src/pages/DashboardAdmin.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DashboardAdmin() {
  const [certificates, setCertificates] = useState([]);
  const token = localStorage.getItem('adminToken');

  // Ambil semua sertifikat dari backend
  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/sertifikat-event', {
          headers: {
            'x-auth-token': token,
          },
        });
        setCertificates(res.data);
      } catch (err) {
        alert('Gagal memuat data sertifikat');
      }
    };

    if (token) {
      fetchCertificates();
    }
  }, [token]);

  // Fungsi update status sertifikat
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/api/sertifikat-event/status/${id}`,
        { status: newStatus },
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );

      // Update UI tanpa refresh
      setCertificates(
        certificates.map((cert) =>
          cert._id === id ? { ...cert, status: newStatus } : cert
        )
      );
    } catch (err) {
      alert('Gagal memperbarui status sertifikat.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Dashboard Admin</h2>
      <p>Kelola permintaan sertifikat pengguna</p>

      {certificates.length === 0 ? (
        <p>Tidak ada sertifikat yang perlu diproses.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Judul Sertifikat</th>
              <th>Nama Pengguna</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {certificates.map((cert) => (
              <tr key={cert._id}>
                <td>{cert.title}</td>
                <td>{cert.user?.name || 'Tidak ditemukan'}</td>
                <td>
                  {cert.status === 'approved'
                    ? 'Disetujui'
                    : cert.status === 'rejected'
                    ? 'Ditolak'
                    : 'Menunggu'}
                </td>
                <td>
                  {cert.status !== 'approved' && (
                    <>
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => handleUpdateStatus(cert._id, 'approved')}
                      >
                        Terima
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleUpdateStatus(cert._id, 'rejected')}
                      >
                        Tolak
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DashboardAdmin;