import axios from "axios";

// const REACT_APP_API_URL = 'http://localhost:5000/api';
// const REACT_APP_API_URL = 'https://blockchain-project-api.vercel.app/api';
const REACT_APP_API_URL = "https://trustbazar-backend.onrender.com/api";

export const publicRequest = axios.create({
  baseURL: REACT_APP_API_URL,
});
