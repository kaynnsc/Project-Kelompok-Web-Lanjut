import axios from 'axios';

// Konfigurasi dasar
const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper function untuk auth
const getAuthHeader = (token) => {
  if (!token) {
    throw new Error('Token tidak tersedia');
  }
  return {
    headers: {
      'x-auth-token': token,
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
  apiClient.get(`/sertifikat-event/${certificateId}/pdf`, {
    ...getAuthHeader(token),
    responseType: 'blob',
  });

// Tambahkan interceptor jika mau (opsional)
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

// Tidak perlu export default karena semua fungsi sudah export named