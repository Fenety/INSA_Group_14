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


export default api