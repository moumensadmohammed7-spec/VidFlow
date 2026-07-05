import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:3001",
  timeout: 30000,
});

API.interceptors.request.use((config) => {
  console.log("Request:", config.baseURL + config.url);
  return config;
});

export default API;
