// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import CertificateForm from '../components/CertificateForm';
import CertificateList from '../components/CertificateList';
import { getCertificatesByUserId } from '../services/api';
import { ToastContainer, toast } from 'react-toastify'; // Untuk notifikasi
import 'react-toastify/dist/ReactToastify.css';

function Dashboard() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      setError('Anda harus login terlebih dahulu.');
      setLoading(false);
      return;
    }

    const fetchCertificates = async () => {
      try {
        const res = await getCertificatesByUserId(token);
        setCertificates(res.data);
        toast.success('Data sertifikat berhasil dimuat');
      } catch (err) {
        setError('Gagal memuat riwayat sertifikat. Silakan coba lagi nanti.');
        toast.error('Gagal memuat data sertifikat');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, [token]);

  const handleAddCertificateSuccess = (newCert) => {
    setCertificates([newCert, ...certificates]);
    toast.success('Sertifikat berhasil ditambahkan');
  };

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const res = await getCertificatesByUserId(token);
      setCertificates(res.data);
      toast.success('Data diperbarui');
    } catch (err) {
      toast.error('Gagal memperbarui data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Buat Sertifikat Baru</h2>
        <button className="btn btn-outline-primary" onClick={handleRefresh}>
          Refresh Data
        </button>
      </div>

      <CertificateForm onAddSuccess={handleAddCertificateSuccess} />

      <hr className="my-4" />

      <h4>Riwayat Sertifikat Anda</h4>

      {loading ? (
        <p className="text-muted">Memuat data sertifikat...</p>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : certificates.length === 0 ? (
        <p className="text-muted">Belum ada sertifikat yang dibuat.</p>
      ) : (
        <CertificateList certificates={certificates} />
      )}

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
}

export default Dashboard;