import axios from 'axios';
import { store } from '../store/store';

const API_URL = 'http://192.168.0.42:8081/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response Interceptor to unwrap backend data
api.interceptors.response.use(
  (response) => {
    // If it has our standard wrapper, return the inner data
    if (response.data && response.data.success === true) {
      return { ...response, data: response.data.data };
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const HttpService = {
  get: async <T = any>(url: string, params?: any) => {
    return api.get<T>(url, { params });
  },

  post: async <T = any>(url: string, data?: any) => {
    return api.post<T>(url, data);
  },

  put: async <T = any>(url: string, data?: any) => {
    return api.put<T>(url, data);
  },

  patch: async <T = any>(url: string, data?: any) => {
    return api.patch<T>(url, data);
  },

  delete: async <T = any>(url: string) => {
    return api.delete<T>(url);
  },
  
  postMultipart: async <T = any>(url: string, formData: FormData) => {
    return api.post<T>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

// Token Interceptor
api.interceptors.request.use((config) => {
  const state = store.getState();
  const token = (state as any).auth?.token;
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});
