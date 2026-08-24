import axiosClient from '../../api/axiosClient';

export const authService = {
    login: async (username, password) => {
        const response = await axiosClient.post('/login', { username, password });
        return response.data;
    },
};
