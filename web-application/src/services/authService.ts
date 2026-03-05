import api from './api';

export const authService = {
    register: async (data: any) => {
        const response = await api.post('/auth/register', data);
        return response.data;
    },

    login: async (phoneNumber: string) => {
        const response = await api.post('/auth/login', { phoneNumber });
        return response.data;
    },

    verifyOtp: async (phoneNumber: string, otp: string) => {
        const response = await api.post('/auth/verify-otp', { phoneNumber, otp });
        return response.data;
    },

    logout: async () => {
        const response = await api.post('/auth/logout');
        return response.data;
    },
};
