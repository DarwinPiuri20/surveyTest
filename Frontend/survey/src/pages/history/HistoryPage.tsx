import { Card } from 'primereact/card';

const HistoryPage = () => {
    return (
        <div className="p-5">
            <h2 className="mb-4">Historial de Evaluaciones</h2>
            <Card>
                <p>
                    Aquí se mostrará una tabla con todas las evaluaciones realizadas por vendedor,
                    incluyendo filtros por fecha, exportación a PDF/Excel y acceso al detalle.
                </p>
            </Card>
        </div>
    );
};

export default HistoryPage;
