import axiosClient from '../api/axiosClient';

export const authService = {
    // ฟังก์ชันยิง API Login
    login: async (username, password) => {
        const response = await axiosClient.post('/login', { username, password });
        return response.data; // จะคืนค่า { message: "...", token: "..." }
    },

    // ฟังก์ชันช่วยเหลือสำหรับ Logout (ลบ Token)
    logout: () => {
        localStorage.removeItem('token');
    }
};