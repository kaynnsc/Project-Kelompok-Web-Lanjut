import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
});

const getAuthHeaders = (token) => ({
  headers: { 'x-auth-token': token },
});

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const registerUser = (data) => apiClient.post('/auth/register', data, config);
export const loginUser = (data) => apiClient.post('/auth/login', data, config);

export const createEventCertificate = (token, data) =>
  apiClient.post('/sertifikat-event', data, { ...getAuthHeaders(token), ...config });

export const getEventCertificatesByUserId = (token) =>
  apiClient.get('/sertifikat-event/me', getAuthHeaders(token));

export const generateCertificatePDF = (token, certificateId) => {
  return apiClient.get(`/sertifikat-event/${certificateId}/pdf`, {
    headers: { 'x-auth-token': token },
    responseType: 'blob',
  });
};

export const getUserProfile = (token) =>
  apiClient.get('/user/profile', getAuthHeaders(token));

export default apiClient;