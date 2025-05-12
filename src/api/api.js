import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_API}`,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("booking-token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
