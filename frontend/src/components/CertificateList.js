// src/components/CertificateList.js
import React from 'react';

// Komponen ini menerima 'certificates' sebagai properti (prop)
// dari halaman Dashboard.
function CertificateList({ certificates }) {

  // Jika tidak ada data sertifikat, tampilkan pesan.
  if (!certificates || certificates.length === 0) {
    return <p className="text-muted mt-4">Belum ada riwayat sertifikat.</p>;
  }

  return (
    <div className="mt-4">
      <h4>Riwayat Sertifikat</h4>
      <ul className="list-group">
        {/* data dummy dari props untuk membuat daftar */}
        {certificates.map((cert, idx) => (
          <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              {/* Menampilkan data dari array dummy */}
              <strong>{cert.jenis_vaksin}</strong>
              <br />
              <small>Tanggal: {cert.tanggal_pemberian}</small>
            </div>
            <div>
              {/* Tombol Lihat: Mengarahkan ke file PDF di folder public */}
              <a 
                href="/contoh-sertifikat.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-sm btn-info me-2"
              >
                Lihat
              </a>
              
              {/* Tombol Download: Memicu unduhan file PDF yang sama */}
              <a 
                href="/contoh-sertifikat.pdf" 
                download="Sertifikat-Contoh.pdf"
                className="btn btn-sm btn-primary"
              >
                Download PDF
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CertificateList;