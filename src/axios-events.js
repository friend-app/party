import axios from 'axios';
import { BASE_URL } from './shared/URLS';

const instance = axios.create({
  baseURL: BASE_URL + 'api/events/',
});

instance.interceptors.request.use (
  function (config) {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = token;
    return config;
  },
  function (error) {
    return Promise.reject (error);
  }
);


export default instance;