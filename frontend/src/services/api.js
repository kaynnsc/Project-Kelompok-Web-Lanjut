// src/services/api.js
import axios from 'axios';

// Membuat instance axios dengan base URL backend
const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// 🔐 AUTHENTICATION
export const registerUser = (data) => apiClient.post('/auth/register', data);
export const loginUser = (data) => apiClient.post('/auth/login', data);

// 📄 SERTIFIKAT IMUNISASI
export const createCertificate = (token, data) =>
  apiClient.post('/sertifikat', data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getCertificatesByUserId = (token) =>
  apiClient.get('/sertifikat/me', {
    headers: { Authorization: `Bearer ${token}` },
  });

export const generateCertificatePDF = (token, certificateId) =>
  apiClient.get(`/sertifikat/generate/${certificateId}`, {
    headers: { Authorization: `Bearer ${token}` },
    responseType: 'blob', // Penting untuk download file
  });

// 🧑 USER PROFILE
export const getUserProfile = (token) =>
  apiClient.get('/user/profile', {
    headers: { Authorization: `Bearer ${token}` },
  });

export default apiClient;