import axios from 'axios';
import { clearAccessToken, getAccessToken } from '../services/tokenStorage';
import { triggerForceLogout } from '../services/authEvents';

const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      const url = error.config?.url ?? '';
      const isCredentialsAttempt = url.includes('/auth/login') || url.includes('/auth/register');

      if (!isCredentialsAttempt) {
        clearAccessToken();
        triggerForceLogout();
      }
    }

    return Promise.reject(error);
  },
);

export default api;
