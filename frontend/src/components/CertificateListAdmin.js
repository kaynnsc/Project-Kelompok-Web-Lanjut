// src/components/CertificateListAdmin.js
import React from 'react';
import { updateCertificateStatus } from '../services/api';
import { toast } from 'react-toastify';

const CertificateListAdmin = ({ certificates, setCertificates, token }) => {
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await updateCertificateStatus(id, { status: newStatus }, token);
      setCertificates(
        certificates.map((cert) =>
          cert._id === id ? { ...cert, status: newStatus } : cert
        )
      );
      toast.success(`Status diperbarui menjadi "${newStatus}"`);
    } catch (err) {
      toast.error('Gagal memperbarui status');
    }
  };

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Nama Pengguna</th>
          <th>Judul</th>
          <th>Status</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {certificates.map((cert) => (
          <tr key={cert._id}>
            <td>{cert.user.name}</td>
            <td>{cert.title}</td>
            <td>
              <span
                className={`badge ${
                  cert.status === 'approved'
                    ? 'bg-success'
                    : cert.status === 'rejected'
                    ? 'bg-danger'
                    : 'bg-secondary'
                }`}
              >
                {cert.status}
              </span>
            </td>
            <td>
              <button
                className="btn btn-success btn-sm me-2"
                onClick={() => handleUpdateStatus(cert._id, 'approved')}
              >
                Approve
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleUpdateStatus(cert._id, 'rejected')}
              >
                Reject
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CertificateListAdmin;