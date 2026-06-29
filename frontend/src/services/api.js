import axios from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getApiErrorMessage = (
  error,
  fallback = 'Something went wrong. Please try again.'
) => {
  const detail = error?.response?.data?.detail;

  if (typeof detail === 'string') {
    return detail;
  }

  if (Array.isArray(detail)) {
    return detail.map((item) => item.msg).join(', ');
  }

  return fallback;
};

export const calculateEMI = async (data) => {
  const response = await api.post('/calculate', data);
  return response.data;
};

export const getHistory = async () => {
  const response = await api.get('/history');
  return response.data;
};

export const deleteRecord = async (id) => {
  const response = await api.delete(`/history/${id}`);
  return response.data;
};

export const getStatistics = async () => {
  const response = await api.get('/statistics');
  return response.data;
};
