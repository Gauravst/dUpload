import axios from "axios";

const API_URL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: API_URL,
  timeout: 500000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export default api;
