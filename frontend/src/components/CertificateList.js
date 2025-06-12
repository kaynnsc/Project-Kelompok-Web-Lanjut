// src/components/CertificateList.js
import React, { useEffect, useState } from 'react';
import { getCertificatesByUserId, generateCertificatePDF } from '../../services/api';

function CertificateList() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await getCertificatesByUserId(token);
        setCertificates(res.data);
      } catch (err) {
        setError('Gagal memuat riwayat sertifikat.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchCertificates();
    }
  }, [token]);

  const handleDownloadPDF = (certificateId) => {
    generateCertificatePDF(token, certificateId).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      `link.setAttribute('download', sertifikat-${certificateId}.pdf)`;
      document.body.appendChild(link);
      link.click();
      link.remove();
    }).catch((err) => {
      alert('Gagal mengunduh PDF sertifikat');
      console.error(err);
    });
  };

  return (
    <div className="mt-4">
      <h4>Riwayat Sertifikat</h4>

      {loading ? (
        <p className="text-muted">Memuat data...</p>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : certificates.length === 0 ? (
        <p className="text-muted">Belum ada sertifikat.</p>
      ) : (
        <ul className="list-group">
          {certificates.map((cert, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{cert.jenis_vaksin}</strong><br />
                <small>Tanggal: {new Date(cert.tanggal_pemberian).toLocaleDateString()}</small>
              </div>
              <button
                onClick={() => handleDownloadPDF(cert._id)}
                className="btn btn-sm btn-primary"
              >
                Download PDF
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CertificateList;