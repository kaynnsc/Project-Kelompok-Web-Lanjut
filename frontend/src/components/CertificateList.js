// src/components/CertificateList.js
import React from 'react';

function CertificateList({ certificates }) {
  return (
    <div className="mt-4">
      <h4>Riwayat Sertifikat</h4>
      <ul className="list-group">
        {certificates.map((cert, idx) => (
          <li key={idx} className="list-group-item">
            <strong>{cert.jenis_vaksin}</strong> - {cert.tanggal_pemberian}
            <button className="btn btn-sm btn-primary float-end">Download PDF</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CertificateList;