import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api', 
});

// auth
export const registerUser = (data) => apiClient.post('/auth/register', data);
export const loginUser = (data) => apiClient.post('/auth/login', data);

// sertifikat
export const createEventCertificate = (token, data) =>
  apiClient.post('/sertifikat-event', data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getEventCertificatesByUserId = (token) =>
  apiClient.get('/sertifikat-event/me', {
    headers: { Authorization: `Bearer ${token}` },
  });

export const generateEventCertificatePDF = (token, certificateId) =>
  apiClient.get(`/sertifikat-event/generate/${certificateId}`, {
    headers: { Authorization: `Bearer ${token}` },
    responseType: 'blob', // Penting untuk download file
  });

// profile
export const getUserProfile = (token) =>
  apiClient.get('/user/profile', {
    headers: { Authorization: `Bearer ${token}` },
  });

export default apiClient;