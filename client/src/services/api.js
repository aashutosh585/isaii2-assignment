import axios from 'axios'

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Auth API calls
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
}

// User API calls
export const userAPI = {
  getStats: () => api.get('/user/stats'),
  getProgress: () => api.get('/user/progress'), 
  updateProgress: (data) => api.put('/user/progress', data),
}

// Interview API calls
export const interviewAPI = {
  getInterviews: () => api.get('/interviews'),
  getInterview: (id) => api.get(`/interviews/${id}`),
  createInterview: (data) => api.post('/interviews', data),
  updateInterview: (id, data) => api.put(`/interviews/${id}`, data),
  deleteInterview: (id) => api.delete(`/interviews/${id}`),
}

// Test API calls
export const testAPI = {
  getTests: () => api.get('/tests'),
  getTest: (id) => api.get(`/tests/${id}`),
  submitTest: (id, answers) => api.post(`/tests/${id}/submit`, { answers }),
  getResults: (id) => api.get(`/tests/${id}/results`),
}

// Resume API calls
export const resumeAPI = {
  getResumes: () => api.get('/resumes'),
  getResume: (id) => api.get(`/resumes/${id}`),
  uploadResume: (formData) => api.post('/resumes/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  updateResume: (id, data) => api.put(`/resumes/${id}`, data),
  updateResumeSection: (id, sectionName, sectionData) => api.put(`/resumes/${id}/section`, { 
    sectionName, 
    sectionData 
  }),
  deleteResume: (id) => api.delete(`/resumes/${id}`),
  chatWithAI: (id, message) => api.post(`/resumes/${id}/chat`, { message }),
  analyzeResume: (id) => api.post(`/resumes/${id}/analyze`)
}

export default api