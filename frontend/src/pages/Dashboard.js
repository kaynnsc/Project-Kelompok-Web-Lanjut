// src/pages/Dashboard.js
import React from 'react';
import CertificateForm from '../components/CertificateForm';
import CertificateList from '../components/CertificateList';

function Dashboard() {
  const dummyCertificates = [
    { jenis_vaksin: "Sinovac", tanggal_pemberian: "2023-09-01" },
    { jenis_vaksin: "Pfizer", tanggal_pemberian: "2023-10-01" }
  ];

  return (
    <div className="container mt-5">
      <h2>Buat Sertifikat Baru</h2>
      <CertificateForm />
      <CertificateList certificates={dummyCertificates} />
    </div>
  );
}

export default Dashboard;