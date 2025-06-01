import { useEffect, useState } from 'react';
import { loadDashboard } from '../../services/dashboardService';
import type { DashboardData } from '../../types/dashboards';
import { Chart } from 'primereact/chart';
import { Card } from 'primereact/card';

const AdminDashboardVisual = () => {
    const [data, setData] = useState<DashboardData | null>(null);

    useEffect(() => {
        loadDashboard().then(setData);
    }, []);

    if (!data) return <p className="p-4">Cargando datos...</p>;

    const chartMonths = {
        labels: data.interviewsPerMonth?.map((e) => e.month) || [],
        datasets: [
            {
                label: 'Entrevistas por mes',
                data: data.interviewsPerMonth?.map((e) => e.amount) || [],
            },
        ],
    };

    const chartStages = {
        labels: data.performancePerStage?.map((e) => e.stage) || [],
        datasets: [
            {
                label: 'Entrevistas por etapa',
                data: data.performancePerStage?.map((e) => e.average) || [],
            },
        ],
    };

    return (
        <div>
            <div className="p-grid">
                {Array.isArray(data.topSellers) && data.topSellers.map((v) => (
                    <div key={v.name} className="p-col-12 p-md-4">
                        <Card title={v.name}>
                            <p><strong>Score promedio:</strong> {v.average.toFixed(2)}</p>
                        </Card>
                    </div>
                ))}
            </div>

            <div className="p-grid mt-5">
                <div className="p-col-12 p-md-6">
                    <Chart type="bar" data={chartMonths} />
                </div>
                <div className="p-col-12 p-md-6">
                    <Chart type="line" data={chartStages} />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardVisual;
