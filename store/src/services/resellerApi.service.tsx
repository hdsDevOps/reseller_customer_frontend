import axios, { AxiosInstance } from 'axios';
import store from '../store'; // Ensure this path is correct

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.RESELLER_BASE_URL,
  timeout: 10000, // Adjust as needed
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    const resellerToken = store.getState().auth.resellerToken; // Adjust to match your auth state structure
    if (resellerToken) {
      config.headers.Authorization = `Bearer ${resellerToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    if (
      response?.status === 410 ||
      response?.status === 401 ||
      response?.status === 403
    ) {
      // Handle logout or other logic
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
