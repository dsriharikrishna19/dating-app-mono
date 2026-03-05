import api from './api';

export const userService = {
    getDiscoverUsers: async () => {
        const response = await api.get('/discovery');
        return response.data;
    },

    updateProfile: async (data: any) => {
        const response = await api.put('/user/profile', data);
        return response.data;
    },

    getProfile: async () => {
        const response = await api.get('/user/profile');
        return response.data;
    },

    onboard: async (data: any) => {
        const response = await api.post('/user/onboarding', data);
        return response.data;
    },

    uploadPhoto: async (formData: FormData) => {
        const response = await api.post('/user/upload-photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },
};

export const matchService = {
    like: async (targetUserId: string) => {
        const response = await api.post(`/discovery/like/${targetUserId}`);
        return response.data;
    },

    pass: async (targetUserId: string) => {
        const response = await api.post(`/discovery/pass/${targetUserId}`);
        return response.data;
    },
};
