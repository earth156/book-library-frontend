import axios from 'axios';

// 1. กำหนด Base URL อัตโนมัติ (ชี้ localhost เมื่อรันในเครื่อง / ชี้ Render เมื่อรันออนไลน์)
const getBaseURL = () => {
    if (import.meta.env.VITE_API_URL) {
        return import.meta.env.VITE_API_URL;
    }
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
        return 'http://localhost:3000/api';
    }
    return 'https://book-library-backend-cjve.onrender.com/api';
};

const axiosClient = axios.create({
    baseURL: getBaseURL(),
    headers: {
        'Content-Type': 'application/json',
    },
});

// 2. Interceptor สำหรับ "ก่อน" ส่ง Request (ดักจับเพื่อแนบ Token)
axiosClient.interceptors.request.use(
    (config) => {
        // ดึง Token จาก Local Storage
        const token = localStorage.getItem('token');
        if (token) {
            // ถ้ามี Token ให้แนบไปกับ Header
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 3. Interceptor สำหรับ "หลัง" รับ Response (ดักจับ Error 401)
axiosClient.interceptors.response.use(
    (response) => {
        // ถ้าสำเร็จ (2xx) ก็ส่งข้อมูลกลับไปปกติ
        return response;
    },
    (error) => {
        // ถ้า Backend ตอบกลับมาเป็น 401 Unauthorized
        // ยกเว้น endpoint /login เพื่อป้องกัน redirect loop
        const isLoginRequest = error.config?.url?.includes('/login');
        if (error.response && error.response.status === 401 && !isLoginRequest) {
            console.warn('Unauthorized or Token expired. Logging out...');
            localStorage.removeItem('token'); // ลบ Token ทิ้ง
            window.location.href = '/?sessionExpired=true'; // บังคับเตะกลับไปหน้า Login พร้อม query parameter
        }
        return Promise.reject(error);
    }
);

export default axiosClient;