import React, { useState } from 'react';
import { generateCertificatePDF } from '../services/api';

// ini untuk menerima props dari Dashboard.js
function CertificateList({ certificates, loading, error }) { 
  const token = localStorage.getItem('token');
  const [downloadingId, setDownloadingId] = useState(null);

  // handling download pdf
  const handleDownloadPDF = async (certificateId) => {
    setDownloadingId(certificateId);
    try {
      const response = await generateCertificatePDF(token, certificateId);
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `sertifikat-event-${certificateId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error('Error saat mengunduh PDF:', err);
      if (err.response && err.response.status === 403) {
        alert('Gagal: Sertifikat ini belum disetujui oleh admin.');
      } else {
        alert('Gagal mengunduh sertifikat PDF. Silakan coba lagi.');
      }
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
                <strong>{cert.nama_event}</strong>
                <br />
                <small className="text-muted">Peserta: {cert.nama_peserta}</small>
                <br />
                <small className="text-muted">Tanggal: {new Date(cert.tanggal_event).toLocaleDateString('id-ID')}</small>
              </div>

              <div className="d-flex align-items-center">
                <span className={`badge me-3 ${
                  cert.status === 'approved' ? 'bg-success' :
                  cert.status === 'rejected' ? 'bg-danger' : 'bg-warning'
                }`}>
                  {cert.status}
                </span>

                <button
                  onClick={() => handleDownloadPDF(cert._id)}
                  className="btn btn-sm btn-primary"
                  disabled={cert.status !== 'approved' || downloadingId === cert._id}
                >
                  {downloadingId === cert._id ? 'Mengunduh...' : 'Unduh PDF'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CertificateList;