import { Card } from 'primereact/card';
import { useAuth } from '../../context/AuthContext';
import AdminQuickAccess from '../../components/cards/AdminQuickAccess';
import AdminDashboardVisual from './AdminDashboardVisual';

const AdminDashboard = () => {
    const { user } = useAuth();

    return (
        <div className="p-5">
            <h2 className="mb-4">Panel Administrativo</h2>

            <Card className="mb-4" title={`Bienvenido, ${user?.nombre}`}>
                <p>Gestiona el sistema de evaluación comercial y accede a módulos avanzados.</p>
            </Card>

            <AdminQuickAccess />

            <h3 className="mt-5">Métricas Generales</h3>
            <AdminDashboardVisual />
        </div>
    );
};

export default AdminDashboard;
