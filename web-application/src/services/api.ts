import axios from 'axios';
import { API_CONFIG, STORAGE_KEYS } from './apiConfig';


const api = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
    },
});

let reduxStore: any;

export const setupInterceptors = (store: any) => {
    reduxStore = store;
};

// Request interceptor for adding auth token
api.interceptors.request.use(
    (config) => {
        if (reduxStore) {
            const state = reduxStore.getState();
            const token = state.auth.token;

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for handling 401 and other errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 && reduxStore) {
            reduxStore.dispatch({ type: 'auth/forceLogout' });
            // Redirect to login could be handled here or in a hook
        }
        return Promise.reject(error);
    }
);

export function apiGet(url: string, config?: any) {
    return api.get(url, config);
}
export function apiPost(url: string, data?: any, config?: any) {
    return api.post(url, data, config);
}
export function apiPut(url: string, data?: any, config?: any) {
    return api.put(url, data, config);
}
export function apiPatch(url: string, data?: any, config?: any) {
    return api.patch(url, data, config);
}
export function apiDelete(url: string, id?: string, config?: any) {
    const reqConfig = id ? { data: { id }, ...config } : config;
    return api.delete(url, reqConfig);
}

export default api;
