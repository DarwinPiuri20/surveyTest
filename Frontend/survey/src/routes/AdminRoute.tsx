import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import type { JSX } from 'react';

const AdminRoute = ({ children }: { children: JSX.Element }) => {
    const { user } = useAuth();
    if (!user || user.rol !== 'admin') {
        return <Navigate to="/dashboard" />;
    }
    return children;
};

export default AdminRoute;