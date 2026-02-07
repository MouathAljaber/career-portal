import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Handle response errors globally
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ==================== INTERNSHIP API ====================

export const internshipAPI = {
  // Get all internships with filters
  getAll: async (filters = {}) => {
    try {
      const params = new URLSearchParams();

      if (filters.search) params.append('search', filters.search);
      if (filters.location) params.append('location', filters.location);
      if (filters.category) params.append('category', filters.category);
      if (filters.type) params.append('type', filters.type);
      if (filters.minStipend) params.append('minStipend', filters.minStipend);
      if (filters.maxStipend) params.append('maxStipend', filters.maxStipend);
      if (filters.duration) params.append('duration', filters.duration);
      if (filters.sortBy) params.append('sortBy', filters.sortBy);
      if (filters.page) params.append('page', filters.page);
      if (filters.limit) params.append('limit', filters.limit);

      const response = await api.get(`/internships?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching internships:', error);
      throw error;
    }
  },

  // Get single internship by ID
  getById: async id => {
    try {
      const response = await api.get(`/internships/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching internship:', error);
      throw error;
    }
  },

  // Create new internship (Company only)
  create: async internshipData => {
    try {
      const response = await api.post('/internships', internshipData);
      return response.data;
    } catch (error) {
      console.error('Error creating internship:', error);
      throw error;
    }
  },

  // Update internship
  update: async (id, internshipData) => {
    try {
      const response = await api.put(`/internships/${id}`, internshipData);
      return response.data;
    } catch (error) {
      console.error('Error updating internship:', error);
      throw error;
    }
  },

  // Delete internship
  delete: async id => {
    try {
      const response = await api.delete(`/internships/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting internship:', error);
      throw error;
    }
  },

  // Apply to internship (Student only)
  apply: async (id, applicationData) => {
    try {
      const response = await api.post(`/internships/${id}/apply`, applicationData);
      return response.data;
    } catch (error) {
      console.error('Error applying to internship:', error);
      throw error;
    }
  },

  // Get applications for a company internship
  getApplications: async id => {
    try {
      const response = await api.get(`/internships/${id}/applications`);
      return response.data;
    } catch (error) {
      console.error('Error fetching applications:', error);
      throw error;
    }
  },

  // Update application status (Company only)
  updateApplicationStatus: async (id, applicationId, status) => {
    try {
      const response = await api.patch(`/internships/${id}/applications/${applicationId}/status`, {
        status,
      });
      return response.data;
    } catch (error) {
      console.error('Error updating application status:', error);
      throw error;
    }
  },

  // Get company's internships
  getMyInternships: async () => {
    try {
      const response = await api.get('/internships/company/my-internships');
      return response.data;
    } catch (error) {
      console.error('Error fetching company internships:', error);
      throw error;
    }
  },

  // Get filter counts (locations, categories, etc.)
  getCounts: async () => {
    try {
      const response = await api.get('/internships/stats/counts');
      return response.data;
    } catch (error) {
      console.error('Error fetching counts:', error);
      throw error;
    }
  },
};

// ==================== AUTH API ====================

export const authAPI = {
  // Register new user
  register: async userData => {
    try {
      const response = await api.post('/auth/register', userData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      console.error('Error registering:', error);
      throw error;
    }
  },

  // Login user
  login: async credentials => {
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current user
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Check if authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

// ==================== STUDENT API ====================

export const studentAPI = {
  // Get student dashboard
  getDashboard: async () => {
    try {
      const response = await api.get('/student/dashboard');
      return response.data;
    } catch (error) {
      console.error('Error fetching student dashboard:', error);
      throw error;
    }
  },

  // Get student profile
  getProfile: async () => {
    try {
      const response = await api.get('/student/profile');
      return response.data;
    } catch (error) {
      console.error('Error fetching student profile:', error);
      throw error;
    }
  },

  // Update student profile
  updateProfile: async profileData => {
    try {
      const response = await api.put('/student/profile', profileData);
      return response.data;
    } catch (error) {
      console.error('Error updating student profile:', error);
      throw error;
    }
  },

  // Get applied internships
  getAppliedInternships: async () => {
    try {
      const response = await api.get('/student/applications');
      return response.data;
    } catch (error) {
      console.error('Error fetching applied internships:', error);
      throw error;
    }
  },

  // Get saved internships (bookmarks)
  getSavedInternships: async () => {
    try {
      const response = await api.get('/student/bookmarks');
      return response.data;
    } catch (error) {
      console.error('Error fetching saved internships:', error);
      throw error;
    }
  },

  // Toggle bookmark
  toggleBookmark: async internshipId => {
    try {
      const response = await api.post(`/student/bookmarks/${internshipId}`);
      return response.data;
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      throw error;
    }
  },

  // Get student stats
  getStats: async () => {
    try {
      const response = await api.get('/student/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching student stats:', error);
      throw error;
    }
  },

  // Upload resume
  uploadResume: async resumeData => {
    try {
      const response = await api.post('/student/resume', resumeData);
      return response.data;
    } catch (error) {
      console.error('Error uploading resume:', error);
      throw error;
    }
  },
};

// ==================== TALENT POOL API ====================

export const talentPoolAPI = {
  // Get all students (talent pool)
  getAll: async (filters = {}) => {
    try {
      const params = new URLSearchParams();

      if (filters.search) params.append('search', filters.search);
      if (filters.major) params.append('major', filters.major);
      if (filters.university) params.append('university', filters.university);
      if (filters.skills) params.append('skills', filters.skills);
      if (filters.year) params.append('year', filters.year);
      if (filters.minGPA) params.append('minGPA', filters.minGPA);
      if (filters.location) params.append('location', filters.location);
      if (filters.sortBy) params.append('sortBy', filters.sortBy);
      if (filters.page) params.append('page', filters.page);
      if (filters.limit) params.append('limit', filters.limit);

      const response = await api.get(`/talent-pool?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching talent pool:', error);
      throw error;
    }
  },

  // Get single student profile
  getStudent: async studentId => {
    try {
      const response = await api.get(`/talent-pool/${studentId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching student profile:', error);
      throw error;
    }
  },

  // Get filter options
  getFilterOptions: async () => {
    try {
      const response = await api.get('/talent-pool/stats/filters');
      return response.data;
    } catch (error) {
      console.error('Error fetching filter options:', error);
      throw error;
    }
  },
};

export default api;
