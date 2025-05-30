import { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import type{ Question } from '../../types';

const EvaluatePage = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [observation, setObservation] = useState('');

    useEffect(() => {
        fetch('/api/preguntas')
            .then(res => res.json())
            .then(setQuestions);
    }, []);

    const handleChange = (id: number, value: number) => {
        setAnswers((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = () => {
        const data = {
            questions: Object.entries(answers).map(([k, v]) => ({
                questionId: Number(k),
                valor: v,
            })),
            observation,
            sellerId: 1, // se debe seleccionar o pasar el ID real
        };

        fetch('/api/evaluaciones', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        }).then(() => alert('Evaluación enviada'));
    };

    const questionsPerStage = questions.reduce<Record<string, Question[]>>((acc, preg) => {
        if (!acc[preg.stage]) acc[preg.stage] = [];
        acc[preg.stage].push(preg);
        return acc;
    }, {});

    return (
        <div className="p-5">
            <h2 className="mb-4">Evaluar Vendedor</h2>

            {Object.entries(questionsPerStage).map(([stage, group]) => (
                <Card key={stage} title={`Etapa: ${stage}`} className="mb-4">
                    {group.map((p) => (
                        <div key={p.id} className="p-field mb-3">
                            <label>{p.text}</label>
                            <InputNumber
                                value={answers[p.id] || 0}
                                onValueChange={(e) => handleChange(p.id, e.value || 0)}
                                min={1} max={10}
                                showButtons
                                className="w-full"
                            />
                        </div>
                    ))}
                </Card>
            ))}

            <Card title="Observaciones">
                <InputTextarea
                    className="w-full"
                    rows={4}
                    value={observation}
                    onChange={(e) => setObservation(e.target.value)}
                />
            </Card>

            <Button label="Enviar Evaluación" className="mt-3" onClick={handleSubmit} />
        </div>
    );
};

export default EvaluatePage;
