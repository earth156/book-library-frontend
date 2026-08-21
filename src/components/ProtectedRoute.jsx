import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    // เช็คว่ามี Token ใน Local Storage หรือไม่
    const token = localStorage.getItem('token');

    if (!token) {
        // ถ้าไม่มี ให้ Redirect ไปหน้า Login
        return <Navigate to="/login" replace />;
    }

    // ถ้ามี Token ก็ปล่อยให้เข้าไปดูหน้าที่ต้องการ (children) ได้ปกติ
    return children;
};

export default ProtectedRoute;