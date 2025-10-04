// src/services/apiService.js

import axios from 'axios';

// Get the base URL from the environment variables
const API_URL = import.meta.env.VITE_API_BASE_URL;

// 1. Configure the main Axios instance
const api = axios.create({
    baseURL: API_URL,
    // Add headers to send credentials (like cookies or JWT) with every request
    withCredentials: true, 
});

// 2. Define core backend functions

// --- Authentication & User ---
export const loginUser = (credentials) => api.post('/auth/login', credentials);
export const registerUser = (userData) => api.post('/auth/register', userData);
export const logoutUser = () => api.post('/auth/logout');
export const checkAuthStatus = () => api.get('/auth/status'); // To check if the user token is valid

// --- Posts & Feed ---
export const createPost = (postData) => api.post('/posts', postData);
export const fetchFeed = () => api.get('/posts/feed');
export const fetchConnections = () => api.get('/connections');

// --- Profile ---
export const fetchUserProfile = (userId) => api.get(`/users/${userId}`);

// You will now use these functions inside your UI components.