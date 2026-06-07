import axios from "axios";

// const REACT_APP_API_URL = "http://localhost:5000/api";
const REACT_APP_API_URL = "https://trustbazar-backend.onrender.com/api";

// export const publicRequest = axios.create({
//   baseURL: REACT_APP_API_URL,
// });

export const publicRequest = axios.create({
  baseURL: REACT_APP_API_URL,
});

publicRequest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("trustbazar_admin_token");

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);
