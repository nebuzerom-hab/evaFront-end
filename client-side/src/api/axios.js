import axios from "axios";
const axiosInstance = axios.create({
  // baseURL: "http://localhost:7700/api",
  // baseURL: "https://evangadi-q-a-1.onrender.com/api",
  baseURL: "http://18.219.195.80:7700/api",
  headers: { "Content-Type": "application/json" },
});

export default axiosInstance;
