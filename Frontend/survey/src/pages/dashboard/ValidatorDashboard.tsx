import { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';
import { useAuth } from '../../context/AuthContext';

interface MiniEntrevista {
    seller: string;
    date: string;
    score: number;
}

const ValidatorDashboard = () => {
    const { user } = useAuth();
    const [total, setTotal] = useState(0);
    const [latest, setLatest] = useState<MiniEntrevista[]>([]);
    const [chartData, setChartData] = useState<{ labels: string[]; datasets: { label: string; data: number[] }[] } | null>(null);

    useEffect(() => {
        if (user) {
            fetch(`/api/validador/dashboard/${user.id}`)
                .then(res => res.json())
                .then(data => {
                    setTotal(data.total);
                    setLatest(data.ultimas);
                    setChartData({
                        labels: data.porMes.map((e: { month: string; amount: number }) => e.month),
                        datasets: [{
                            label: 'Evaluaciones por Mes',
                            data: data.porMes.map((e: { month: string; amount: number }) => e.amount),
                        }]
                    });
                });
        }
    }, [user]);

    return (
        <div className="p-5">
            <h2 className="mb-4">Dashboard de Evaluador</h2>

            <Card className="mb-3" title={`Entrevistas realizadas`}>
                <p><strong>Total:</strong> {total}</p>
            </Card>

            <div className="p-grid">
                <div className="p-col-12 p-md-6">
                    <Card title="Evaluaciones por mes">
                        {chartData && <Chart type="bar" data={chartData} />}
                    </Card>
                </div>

                <div className="p-col-12 p-md-6">
                    <Card title="Últimas entrevistas">
                        <ul>
                            {latest.map((e, i) => (
                                <li key={i}>
                                    {e.seller} - {new Date(e.date).toLocaleDateString()} - {e.score}/10
                                </li>
                            ))}
                        </ul>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ValidatorDashboard;
