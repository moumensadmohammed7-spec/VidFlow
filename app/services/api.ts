import axios from "axios";

const API = axios.create({
  baseURL: "https://vidflow-eph9.onrender.com",
  timeout: 30000,
});

API.interceptors.request.use((config) => {
  console.log("Request:", config.baseURL + config.url);
  return config;
});

export default API;
