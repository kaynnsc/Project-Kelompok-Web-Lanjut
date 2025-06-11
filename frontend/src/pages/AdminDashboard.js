import React, { useState, useEffect } from 'react';

// dummy
const dummyRequests = [
  {
    id: 'req001',
    nama_peserta: 'Budi Santoso',
    nim: '123456789',
    nama_event: 'Webinar Nasional: AI di Era Digital',
    penyelenggara: 'Himpunan Mahasiswa TI',
    tanggal_event: '2024-05-20',
    peran: 'Peserta',
    status: 'pending'
  },
  {
    id: 'req002',
    nama_peserta: 'Citra Lestari',
    nim: '987654321',
    nama_event: 'Workshop UI/UX Design',
    penyelenggara: 'UKM Kriptografi',
    tanggal_event: '2024-04-11',
    peran: 'Panitia',
    status: 'pending'
  },
  {
    id: 'req003',
    nama_peserta: 'Agus Setiawan',
    nim: '555111222',
    nama_event: 'Pelatihan Dasar Kepemimpinan',
    penyelenggara: 'BEM Universitas',
    tanggal_event: '2024-03-15',
    peran: 'Peserta',
    status: 'pending'
  }
];

function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setRequests(dummyRequests);
    setLoading(false);
  }, []);

  const handleAccept = (id) => {
    console.log(`Menerima pengajuan dengan ID: ${id}`);

    setRequests(currentRequests => currentRequests.filter(req => req.id !== id));
    alert(`Pengajuan ${id} telah diterima!`);
  };

  const handleReject = (id) => {
    console.log(`Menolak pengajuan dengan ID: ${id}`);

    setRequests(currentRequests => currentRequests.filter(req => req.id !== id));
    alert(`Pengajuan ${id} telah ditolak.`);
  };

  if (loading) {
    return <div className="container mt-5"><p>Memuat data...</p></div>;
  }

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>
      <p>Verifikasi Pengajuan Sertifikat Event</p>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>ID Pengajuan</th>
                  <th>Nama Peserta</th>
                  <th>NIM</th>
                  <th>Nama Event</th>
                  <th>Tanggal</th>
                  <th>Peran</th>
                  <th className="text-center">Tindakan</th>
                </tr>
              </thead>
              <tbody>
                {requests.length > 0 ? (
                  requests.map((req) => (
                    <tr key={req.id}>
                      <td><small>{req.id}</small></td>
                      <td>{req.nama_peserta}</td>
                      <td>{req.nim}</td>
                      <td>
                        <strong>{req.nama_event}</strong><br/>
                        <small className="text-muted">{req.penyelenggara}</small>
                      </td>
                      <td>{req.tanggal_event}</td>
                      <td><span className="badge bg-secondary">{req.peran}</span></td>
                      <td className="text-center">
                        <button 
                          className="btn btn-success btn-sm me-2"
                          onClick={() => handleAccept(req.id)}
                        >
                          Terima
                        </button>
                        <button 
                          className="btn btn-danger btn-sm"
                          onClick={() => handleReject(req.id)}
                        >
                          Tolak
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center p-4">
                      Tidak ada pengajuan yang perlu diverifikasi.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;