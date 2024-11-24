// src/api.ts
import axios from 'axios';
import { api_url } from './domain/back';

const api = axios.create({
    baseURL: api_url, // Base URL for your API
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true // Allow cookies to be sent and received
});

// Add a request interceptor to include the token in all requests
api.interceptors.request.use(
    (config) => {
        // if (audiologistToken) {
        //     config.headers['Authorization'] = `Bearer ${audiologistToken}`;
        // }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
