import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

const useLogin = () => {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const login = async (username, password) => {
        setIsLoading(true);
        setError('');

        try {
            const data = await authService.login(username, password);
            localStorage.setItem('token', data.token);
            navigate('/books');
        } catch (err) {
            setError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
            console.error('Login error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return { login, error, isLoading };
};

export default useLogin;
