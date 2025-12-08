import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use(async (config) => {
  // Try to get token from window (set by hooks) or from Clerk directly
  let token = (window as any).__CLERK_TOKEN__;
  
  // If no token on window, try to get it from Clerk session
  if (!token && typeof window !== 'undefined') {
    try {
      // @ts-ignore - Clerk global
      const clerk = window.Clerk;
      if (clerk && clerk.session) {
        token = await clerk.session.getToken();
        // Cache it for next time
        (window as any).__CLERK_TOKEN__ = token;
      }
    } catch (e) {
      console.error('Failed to get Clerk token from window.Clerk:', e);
    }
  }
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('✅ Authorization header added to request:', config.url);
  } else {
    console.warn('⚠️ No auth token available for request:', config.url);
  }
  return config;
});

// Profile API
export const profileAPI = {
  getProfile: async () => {
    const response = await api.get('/profile');
    return response.data;
  },
  
  updateProfile: async (data: any) => {
    const response = await api.put('/profile', data);
    return response.data;
  },
  
  addSkill: async (skill: { name: string; level: string; yearsUsed?: number }) => {
    const response = await api.post('/profile/skills', skill);
    return response.data;
  },
  
  deleteSkill: async (skillId: string) => {
    await api.delete(`/profile/skills/${skillId}`);
  },
  
  addExperience: async (experience: any) => {
    const response = await api.post('/profile/experience', experience);
    return response.data;
  },
  
  deleteExperience: async (expId: string) => {
    await api.delete(`/profile/experience/${expId}`);
  },
};

// Resume API
export const resumeAPI = {
  getResumes: async () => {
    const response = await api.get('/resumes');
    return response.data;
  },
  
  uploadResume: async (file: File) => {
    const formData = new FormData();
    formData.append('resume', file);
    
    const response = await api.post('/resumes/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  setPrimaryResume: async (resumeId: string) => {
    const response = await api.put(`/resumes/${resumeId}/primary`);
    return response.data;
  },
  
  deleteResume: async (resumeId: string) => {
    await api.delete(`/resumes/${resumeId}`);
  },
};

// Application API (placeholder - to be implemented)
export const applicationAPI = {
  getApplications: async () => {
    // TODO: Implement when applications route is added
    return [];
  },
  
  createApplication: async (data: any) => {
    // TODO: Implement when applications route is added
    return {};
  },
};

// Interview API (placeholder - to be implemented)
export const interviewAPI = {
  getInterviews: async () => {
    // TODO: Implement when interviews route is added
    return [];
  },
  
  scheduleInterview: async (data: any) => {
    // TODO: Implement when interviews route is added
    return {};
  },
};

// AI Interaction API (placeholder - to be implemented)
export const aiAPI = {
  startSession: async (type: string, data?: any) => {
    // TODO: Implement when AI routes are added
    return {};
  },
  
  getHistory: async () => {
    // TODO: Implement when AI routes are added
    return [];
  },
};

export default api;
