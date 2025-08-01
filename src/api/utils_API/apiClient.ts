import axios from 'axios';

export const apiClient = axios.create({
  //baseURL: 'https://intapi.lendingpoint.com',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Exchange-Format': 'core',
  },
});