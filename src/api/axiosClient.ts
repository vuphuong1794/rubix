import axios from 'axios';

import { BASE_URL_API } from '@/constant';
const axiosClient = axios.create({
  baseURL: BASE_URL_API,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  function (config) {
    if (config.headers) {
      config.headers['Accept-Language'] = 'en'; // vn - en
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosClient;
