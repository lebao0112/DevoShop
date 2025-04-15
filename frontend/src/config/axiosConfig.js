import axios from "axios";


const api = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 100000000000000,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const withJWT = config.withJWT !== false; // mặc định là true
    const token = localStorage.getItem("authToken");

    if (withJWT && token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default api;
