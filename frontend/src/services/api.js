import axios from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const CONTEXT_MESSAGES = {
  calculate: 'Calculation failed.',
  history: 'Unable to load history.',
  statistics: 'Unable to load statistics.',
  delete: 'Failed to delete record.',
};

export const getApiErrorMessage = (error, context = 'default') => {
  if (!error) {
    return CONTEXT_MESSAGES[context] || 'Something went wrong. Please try again.';
  }

  if (!error.response) {
    if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
      return 'Network error. Unable to connect to server.';
    }
    return 'Unable to connect to server.';
  }

  const { status, data } = error.response;
  const detail = data?.detail;

  if (status === 422) {
    if (typeof detail === 'string') return detail;
    if (Array.isArray(detail)) {
      return detail.map((item) => item.msg).join('. ');
    }
    return 'Invalid input.';
  }

  if (status === 503 || status === 502 || status === 504) {
    return 'Server is temporarily unavailable.';
  }

  if (status >= 500) {
    return typeof detail === 'string'
      ? detail
      : CONTEXT_MESSAGES[context] || 'Calculation failed.';
  }

  if (typeof detail === 'string') {
    return detail;
  }

  return CONTEXT_MESSAGES[context] || 'Something went wrong. Please try again.';
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
