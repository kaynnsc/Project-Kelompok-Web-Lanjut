import axios from 'axios';

// konfigurasi dasar
const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// helper function untuk auth
const getAuthHeader = (token) => {
  if (!token) {
    throw new Error('Token tidak tersedia');
  }
  return {
    headers: {
      // standar untuk mengirim token adalah melalui header 'Authorization'
      'Authorization': `Bearer ${token}`,
    },
  };
};

// Auth
export const registerUser = (data) => apiClient.post('/auth/register', data);
export const loginUser = (data) => apiClient.post('/auth/login', data);

// User
export const getUserProfile = (token) => apiClient.get('/user/profile', getAuthHeader(token));

// Event Certificate
export const createEventCertificate = (token, data) =>
  apiClient.post('/sertifikat-event', data, getAuthHeader(token));

export const getEventCertificatesByUserId = (token) =>
  apiClient.get('/sertifikat-event/me', getAuthHeader(token));

export const generateCertificatePDF = (token, certificateId) =>
  apiClient.get(`/sertifikat-event/generate/${certificateId}`, { // <-- URL BENAR
    ...getAuthHeader(token),
    responseType: 'blob',
  });

// Admin: Mengambil semua sertifikat yang pending
export const getPendingCertificates = (token) => 
  apiClient.get('/sertifikat-event/pending', getAuthHeader(token));

// Admin: Memverifikasi sertifikat (terima atau tolak)
export const verifyCertificate = (token, certificateId, status) => 
  apiClient.post(`/sertifikat-event/verify/${certificateId}`, { status }, getAuthHeader(token));

apiClient.interceptors.request.use((config) => {
  console.log('Request sedang dikirim:', config.url);
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error dari API:', error.message);
    return Promise.reject(error);
  }
);