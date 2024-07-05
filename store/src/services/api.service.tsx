import axios, { AxiosInstance } from 'axios';
import store from '../store'; // Ensure this path is correct

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL + 'api/',
  timeout: 10000, // Adjust as needed
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    const authToken = store.getState().auth.token; // Adjust to match your auth state structure
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
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

export default axiosInstance;
