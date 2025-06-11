import React from 'react';
import CertificateForm from '../components/CertificateForm';
import CertificateList from '../components/CertificateList';

function Dashboard() {
  // Data dummy (contoh) untuk sertifikat event
  const dummyCertificates = [
    { id: 1, nama_event: "Webinar Nasional: AI di Era Digital", tanggal_event: "2024-05-20", peran: "Peserta" },
    { id: 2, nama_event: "Workshop UI/UX Design", tanggal_event: "2024-04-11", peran: "Panitia" }
  ];

  return (
    <div className="container mt-5">
      <h2>Buat Sertifikat Event Baru</h2>
      <CertificateForm />
      <hr className="my-5" />
      <CertificateList certificates={dummyCertificates} />
    </div>
  );
}

export default Dashboard;