import { useState } from 'react';
import { generateFeedback, getFeedbackHistory, downloadFeedbackPDF } from '../services/feedbackService';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

interface FeedbackItem {
    date: string;
    content: string;
}

const SellerDetailPage = ({ sellerId }: { sellerId: number }) => {
    const [feedback, setFeedback] = useState<string | null>(null);
    const [history, setHistory] = useState<FeedbackItem[]>([]);
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        setLoading(true);
        try {
            const data = await generateFeedback(sellerId);
            setFeedback(data.feedback);
        } catch (err) {
            console.error("Error generating feedback", err);
        }
        setLoading(false);
    };

    const handleLoadHistory = async () => {
        try {
            const data = await getFeedbackHistory(sellerId);
            setHistory(data);
        } catch (err) {
            console.error("Error loading history", err);
        }
    };

    const handleDownloadPDF = () => {
        downloadFeedbackPDF(sellerId);
    };

    return (
        <div className="p-4">
            <h2>Feedback IA para Vendedor #{sellerId}</h2>

            <div className="mb-3">
                <Button label="Generar feedback IA" icon="pi pi-send" onClick={handleGenerate} loading={loading} className="mr-2" />
                <Button label="Ver historial" icon="pi pi-history" onClick={handleLoadHistory} className="mr-2" />
                <Button label="Exportar PDF" icon="pi pi-file-pdf" onClick={handleDownloadPDF} severity="danger" />
            </div>

            {feedback && (
                <Card title="Feedback generado">
                    <p>{feedback}</p>
                </Card>
            )}

            {history.length > 0 && (
                <Card title="Historial de feedback">
                    {history.map((item, idx) => (
                        <div key={idx} className="mb-2">
                            <strong>{item.date}:</strong>
                            <p>{item.content}</p>
                            <hr />
                        </div>
                    ))}
                </Card>
            )}
        </div>
    );
};

export default SellerDetailPage;
