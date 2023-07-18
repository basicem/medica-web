import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001",
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
