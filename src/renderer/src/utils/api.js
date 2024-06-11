import axios from 'axios';

const API = axios.create({
  baseURL: 'https://auth-api-zyji.onrender.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;
