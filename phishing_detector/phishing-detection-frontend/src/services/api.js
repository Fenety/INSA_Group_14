import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
})

// Request interceptor to add auth token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

export const scanUrl = async (url) => {
  const response = await api.post('/analyze/url', { url })
  return response.data
}

export const scanEmail = async (emailContent) => {
  const response = await api.post('/analyze/email', { email: emailContent });
  return response.data;
}

export const getScanHistory = async () => {
  const response = await api.get('/analyze/history')
  return response.data
}

export const getUrlInfo = async (urlId) => {
  const response = await api.get(`/urls/${urlId}`)
  return response.data
}
// // services/api.js

// import axios from 'axios';

// export const fetchScanHistory = async () => {
//   try {
//     const response = await axios.get('http://localhost:3000/api/history'); // replace with your backend URL
//     return response.data; // assuming backend returns { success: true, data: [...] }
//   } catch (error) {
//     console.error('Failed to fetch scan history:', error);
//     throw error;
//   }
// };

// get scan history with optional pagination/filter params
// export const getScanHistory = async ({ page = 1, limit = 50, filters = {} } = {}) => {
//   const params = { page, limit, ...filters };
//   getScanHistory().then(console.log).catch(console.error);
//   const res = await API.get('/analyze/history', { params });

//   return res.data; // expected { items, page, limit, total }
// };

export default api