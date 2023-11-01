import axios from 'axios';

const api = axios.create({
  baseURL: 'https://w1llj1meeg.execute-api.us-east-1.amazonaws.com/prod/abresql',
});

api.interceptors.request.use((config) => {
  config.headers['x-api-key'] = 'kXmls3iiqcacc1Y1IGnO0405GHtxopFw96r5PKiv';
  return config;
});

export default api;