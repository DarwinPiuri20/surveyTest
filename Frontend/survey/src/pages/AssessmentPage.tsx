import { useEffect, useState } from 'react';
import {getQuestions} from "../api/surveys.ts";
import {getSellers} from "../api/seller.ts";
import type{Question} from "../types";
import QuestionItem from "../components/QuestionItem.tsx";
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import {Dropdown} from "primereact/dropdown";
import {submitSurvey} from "../services/surveyService.ts";
import type{Seller, FeedbackIA} from "../types";
import { Divider } from 'primereact/divider';
import { Panel } from 'primereact/panel';

const AssessmentPage = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<Record<number, number | [number, number]>>({});
    const [observation, setObservation] = useState('');
    const [sellers, setSellers] = useState<Seller[]>([]);
    const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);
    const [feedback, setFeedback] = useState<FeedbackIA | null>(null);

    useEffect(() => {
        const loadData= async ()=>{

            const [questions,sellers] = await Promise.all([
                getQuestions(),
                getSellers()
            ]);
            setQuestions(questions)
            setSellers(sellers);
        }

        loadData();
    }, []);

    const handleChange = (id: number, value: number | [number, number]) => {
    setAnswers((prev)=>({...prev,[id]: value,}))
    }

    const handleSubmit = async () => {

        if(!selectedSeller) {
            alert('Por favor, selecciona un vendedor.');
            return;
        }

        const payload={
            sellerId:1,
            answers: Object.entries(answers).map(([id, value]) => ({
                questionId: Number(id),
                valor: Array.isArray(value) ? value[0] : value,
            })),
            observation,
        }
        const feedbackAi = await submitSurvey(payload);
        setFeedback(feedbackAi);
        await submitSurvey(payload)
        setAnswers({});
        setObservation('');
        alert('Evaluación enviada exitosamente.');
        setSelectedSeller(null)
    }

    const questionsForStage =questions.reduce((acc,question)=>{

        if(!acc[question.stage]) {
            acc[question.stage] = [];
        }
        acc[question.stage].push(question);
        return acc;
    }, {} as Record<string, Question[]>);


    return (
        <div className="p-5">
            <h2 className="mb-4">Evaluación Comercial</h2>

            <div className="p-field mb-4" style={{ maxWidth: 300 }}>
                <label htmlFor="vendedor">Seleccionar Vendedor</label>
                <Dropdown
                    id="seller"
                    value={selectedSeller}
                    options={sellers}
                    onChange={(e) => setSelectedSeller(e.value)}
                    optionLabel="name"
                    placeholder="Seleccione un vendedor"
                    className="w-full"
                />
            </div>

            {selectedSeller && Object.entries(questionsForStage).map(([stage, items]) => (
                <Card key={stage} title={stage} className="mb-4">
                    {items.map((p) => (
                        <QuestionItem
                            key={p.id}
                            question={p}
                            worth={Number(Array.isArray(answers[p.id]) ? (answers[p.id] as [number, number])[0] : (answers[p.id] ?? 5))}
                            onChange={(v) => handleChange(p.id, v)}
                        />
                    ))}
                </Card>
            ))}

            {selectedSeller && (
                <>
                    <div className="p-field mt-4">
                        <label>Observaciones Finales</label>
                        <InputTextarea
                            rows={4}
                            value={observation}
                            onChange={(e) => setObservation(e.target.value)}
                            className="w-full"
                        />
                    </div>

                    <Button label="Enviar Evaluación" onClick={handleSubmit} className="mt-3" />
                </>
            )}

            {feedback && (
                <div className="mt-5">
                    <Divider />
                    <h3>Retroalimentación generada por IA</h3>

                    <Panel header="Fortalezas">{feedback.strengths}</Panel>
                    <Panel header="Áreas de mejora" className="mt-3">{feedback.improvements}</Panel>
                    <Panel header="Recomendaciones finales" className="mt-3">{feedback.recommendations}</Panel>
                </div>
            )}
        </div>
    );
}

export default AssessmentPage;