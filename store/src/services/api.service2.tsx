import axios, { AxiosInstance } from 'axios';
import store from '../store'; // Ensure this path is correct

const axiosInstance2: AxiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 10000, // Adjust as needed
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance2.interceptors.request.use(
  function (config) {
    const authToken = config.headers['Authorization']; // Adjust to match your auth state structure
    if (authToken) {
      config.headers.Authorization = authToken;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance2.interceptors.response.use(
  function (response) {
    if (
      response.data?.status === 410 ||
      response.data?.status === 401 ||
      response.data?.status === 403
    ) {
      // Handle logout or other logic
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance2;
