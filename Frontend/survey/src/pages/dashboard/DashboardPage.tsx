import { useAuth } from '../../context/AuthContext';
import AdminDashboard from './AdminDashboard';
import ValidatorDashboard from './ValidatorDashboard';

const DashboardPage = () => {
    const { user } = useAuth();
    if (!user) return <p>Cargando...</p>;

    return (
        <>
            {user.rol === 'admin' && <AdminDashboard />}
            {user.rol === 'validator' && <ValidatorDashboard />}
        </>
    );
};

export default DashboardPage;
