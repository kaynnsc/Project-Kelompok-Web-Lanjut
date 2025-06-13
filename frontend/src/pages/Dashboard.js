import React, { useState, useEffect, useCallback } from 'react';
import CertificateForm from '../components/CertificateForm';
import CertificateList from '../components/CertificateList';
import { getEventCertificatesByUserId } from '../services/api'; 

function Dashboard() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // kita menggunakan useCallback agar fungsi ini tidak dibuat ulang terus-menerus
  const fetchCertificates = useCallback(async () => {
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
  }, []); // dependensi kosong berarti fungsi ini konsisten 

  // mengambil data saat komponen pertama kali dimuat
  useEffect(() => {
    fetchCertificates();
  }, [fetchCertificates]); 

  return (
    <div className="container mt-5">
      <h2>Buat Sertifikat Event Baru</h2>
      {/* memberikan fungsi fetchCertificates ke Form */}
      <CertificateForm onCertificateCreated={fetchCertificates} />

      <hr className="my-5" />

      {/* bagian List sekarang menerima data dari state di halaman ini */}
      <CertificateList 
        certificates={certificates} 
        loading={loading}
        error={error}
      />
    </div>
  );
}

export default Dashboard;