import axios from "axios";

const apiPort = process.env.REACT_APP_API_PORT;
const apiBaseUrl = `http://localhost:${apiPort}`;

const API = axios.create({
  baseURL: apiBaseUrl,
});

// Interceptor for adding JWT token to the request headers
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("Bearer");

  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  throw error;
});

export default API;
