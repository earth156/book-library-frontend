import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

const useLogin = () => {
    // ── Form state (Controller เป็นคนถือ) ──
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});

    // ── API state ──
    const [apiError, setApiError] = useState(() => {
        if (window.location.search.includes('sessionExpired=true')) {
            return 'เซสชันของคุณหมดอายุแล้ว กรุณาเข้าสู่ระบบใหม่อีกครั้ง';
        }
        return '';
    });
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    // ── Validation logic ──
    const validate = () => {
        const errs = {};

        if (!username.trim()) {
            errs.username = 'กรุณากรอกชื่อผู้ใช้';
        } else if (username.trim().length < 3) {
            errs.username = 'ชื่อผู้ใช้ต้องมีอย่างน้อย 3 ตัวอักษร';
        }

        if (!password) {
            errs.password = 'กรุณากรอกรหัสผ่าน';
        } else if (password.length < 4) {
            errs.password = 'รหัสผ่านต้องมีอย่างน้อย 4 ตัวอักษร';
        }

        setFieldErrors(errs);
        return Object.keys(errs).length === 0;
    };

    // ── Submit handler ──
    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setIsLoading(true);
        setApiError('');

        try {
            const data = await authService.login(username.trim(), password);
            localStorage.setItem('token', data.token);
            navigate('/books');
        } catch (err) {
            setApiError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
            console.error('Login error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // ── Clear field error on change ──
    const clearFieldError = (field) => {
        if (fieldErrors[field]) {
            setFieldErrors((prev) => ({ ...prev, [field]: '' }));
        }
    };

    return {
        // Form values
        username,
        setUsername,
        password,
        setPassword,
        // Errors
        fieldErrors,
        apiError,
        // State
        isLoading,
        // Handlers
        handleLogin,
        clearFieldError,
    };
};

export default useLogin;
