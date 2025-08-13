import axios from "axios"
import toast from "react-hot-toast"

// Create axios instance with base configuration
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})

// Request interceptor to add token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      window.location.href = "/login"
      toast.error("Session expirée, veuillez vous reconnecter")
    } else if (error.response?.status === 403) {
      toast.error("Accès non autorisé pour cette action")
    } else if (error.response?.status === 422) {
      // Validation errors
      const errors = error.response.data.errors
      if (errors) {
        Object.values(errors)
          .flat()
          .forEach((err) => toast.error(err))
      } else {
        toast.error("Données invalides")
      }
    } else if (error.response?.status >= 500) {
      toast.error("Erreur serveur, veuillez réessayer plus tard")
    } else if (error.response?.data?.message) {
      toast.error(error.response.data.message)
    }
    return Promise.reject(error)
  },
)

// Auth API calls
export const authAPI = {
  login: (credentials) => api.post("/auth/login", credentials),
  register: (userData) => api.post("/auth/register", userData),
  logout: () => api.post("/auth/logout"),
  me: () => api.get("/auth/me"),
  refreshToken: () => api.post("/auth/refresh"),
}

// Job offers API calls
export const jobOffersAPI = {
  getAll: (params = {}) => api.get("/job-offers", { params }),
  getById: (id) => api.get(`/job-offers/${id}`),
  create: (data) => api.post("/job-offers", data),
  update: (id, data) => api.put(`/job-offers/${id}`, data),
  delete: (id) => api.delete(`/job-offers/${id}`),
  getByRecruiter: (recruiterId) => api.get(`/recruiters/${recruiterId}/job-offers`),
}

// Applications API calls
export const applicationsAPI = {
  getAll: (params = {}) => api.get("/applications", { params }),
  getById: (id) => api.get(`/applications/${id}`),
  create: (data) => api.post("/applications", data),
  update: (id, data) => api.put(`/applications/${id}`, data),
  delete: (id) => api.delete(`/applications/${id}`),
  updateStatus: (id, status) => api.patch(`/applications/${id}/status`, { status }),
  getByCandidate: (candidateId) => api.get(`/candidates/${candidateId}/applications`),
  getByJobOffer: (jobOfferId) => api.get(`/job-offers/${jobOfferId}/applications`),
}

// Interviews API calls
export const interviewsAPI = {
  getAll: (params = {}) => api.get("/interviews", { params }),
  getById: (id) => api.get(`/interviews/${id}`),
  create: (data) => api.post("/interviews", data),
  update: (id, data) => api.put(`/interviews/${id}`, data),
  delete: (id) => api.delete(`/interviews/${id}`),
  getByCandidate: (candidateId) => api.get(`/candidates/${candidateId}/interviews`),
  getByRecruiter: (recruiterId) => api.get(`/recruiters/${recruiterId}/interviews`),
}

// Documents API calls
export const documentsAPI = {
  getAll: (params = {}) => api.get("/documents", { params }),
  getById: (id) => api.get(`/documents/${id}`),
  upload: (formData) =>
    api.post("/documents", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  download: (id) => api.get(`/documents/${id}/download`, { responseType: "blob" }),
  preview: (id) => api.get(`/documents/${id}/preview`),
  delete: (id) => api.delete(`/documents/${id}`),
  getByApplication: (applicationId) => api.get(`/applications/${applicationId}/documents`),
}

// Dashboard stats API
export const dashboardAPI = {
  getStats: () => api.get("/dashboard/stats"),
  getAdminStats: () => api.get("/dashboard/admin-stats"),
  getRecruiterStats: (recruiterId) => api.get(`/dashboard/recruiter-stats/${recruiterId}`),
  getCandidateStats: (candidateId) => api.get(`/dashboard/candidate-stats/${candidateId}`),
}

export default api
