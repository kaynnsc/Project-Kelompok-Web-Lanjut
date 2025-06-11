import React from 'react';

function CertificateList({ certificates }) {
  if (!certificates || certificates.length === 0) {
    return <p>Belum ada sertifikat yang dibuat.</p>;
  }

  return (
    <div className="mt-4">
      <h4>Riwayat Sertifikat Anda</h4>
      <ul className="list-group">
        {certificates.map((cert, idx) => (
          <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{cert.nama_event}</strong> ({cert.peran})
              <br />
              <small className="text-muted">Tanggal: {cert.tanggal_event}</small>
            </div>
            <button className="btn btn-sm btn-primary">Download PDF</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CertificateList;