import React, { useState, useEffect } from 'react';
import CertificateForm from '../components/CertificateForm';
import CertificateList from '../components/CertificateList';
import { getEventCertificatesByUserId } from '../services/api'; 

function Dashboard() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Anda harus login untuk melihat data.');
          setLoading(false);
          return;
        }
        const res = await getEventCertificatesByUserId(token);

        setCertificates(res.data);
      } catch (err) {
        console.error("Gagal mengambil data sertifikat:", err);
        setError('Gagal memuat data dari server.');
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []); 

  return (
    <div className="container mt-5">
      <h2>Buat Sertifikat Event Baru</h2>
      <CertificateForm />
      
      <hr className="my-5" />
      {loading ? (
        <p>Memuat data sertifikat...</p>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <CertificateList certificates={certificates} />
      )}
    </div>
  );
}

export default Dashboard;