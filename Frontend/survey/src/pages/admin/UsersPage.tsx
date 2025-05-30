import { Card } from 'primereact/card';

const UsersPage = () => {
    return (
        <div className="p-5">
            <h2 className="mb-4">Gestión de Usuarios</h2>
            <Card>
                <p>
                    Este módulo permitirá administrar usuarios del sistema, asignar roles (`admin`, `validador`)
                    y gestionar accesos. Funcionalidad próxima a implementar.
                </p>
            </Card>
        </div>
    );
};

export default UsersPage;
