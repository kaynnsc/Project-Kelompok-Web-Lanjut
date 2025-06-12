// src/components/CertificateList.js
import React, { useEffect, useState } from 'react';
import { getEventCertificatesByUserId, generateCertificatePDF } from '../services/api';

function CertificateList() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
  const [downloadingId, setDownloadingId] = useState(null); // Untuk spinner/download

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await getEventCertificatesByUserId(token);
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

  const handleDownloadPDF = async (certificateId) => {
    setDownloadingId(certificateId);

    try {
      const response = await generateCertificatePDF(token, certificateId);

      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: 'application/pdf' })
      );
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `sertifikat-event-${certificateId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();

    } catch (err) {
      console.error('Error saat mengunduh PDF:', err);
      alert('Gagal mengunduh sertifikat PDF. Silakan coba lagi.');
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="mt-4">
      <h4>Riwayat Sertifikat Event</h4>

      {loading ? (
        <p className="text-muted">Memuat data...</p>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : certificates.length === 0 ? (
        <p className="text-muted">Belum ada sertifikat event.</p>
      ) : (
        <ul className="list-group">
          {certificates.map((cert) => (
            <li
              key={cert._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{cert.nama_event}</strong> {/* Ganti jenis_vaksin jadi nama_event */}
                <br />
                <small>Tanggal: {new Date(cert.tanggal_event).toLocaleDateString()}</small> {/* Tanggal event */} <br />
                <small>Peserta: {cert.peserta_nama}</small>
              </div>
              <button
                onClick={() => handleDownloadPDF(cert._id)}
                className="btn btn-sm btn-primary"
                disabled={downloadingId === cert._id}
              >
                {downloadingId === cert._id ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                    Mengunduh...
                  </>
                ) : (
                  'Download PDF'
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CertificateList;