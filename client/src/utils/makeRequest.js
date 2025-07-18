import axios from "axios";

// const REACT_APP_API_URL = 'http://localhost:5000/api';
// const REACT_APP_API_URL = 'https://blockchain-project-api.vercel.app/api';
const REACT_APP_API_URL = "https://blockchain-api-pt82.onrender.com/api";

export const publicRequest = axios.create({
  baseURL: REACT_APP_API_URL,
});
