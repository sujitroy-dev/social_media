import axios from "axios";
const BASE_URL = process.env.API_BASE_URL;

// Instance of Axios with configuration
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
