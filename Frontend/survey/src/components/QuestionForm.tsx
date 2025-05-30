import { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import type{ Question } from '../types';

interface Props {
    question?: Question;
    onSave: (data: Omit<Question, 'id'>) => void;
    onCancel: () => void;
}

const stages = ['Etapa 1', 'Etapa 2', 'Etapa 3'];

const QuestionForm = ({ question, onSave, onCancel }: Props) => {
    const [text, setText] = useState('');
    const [stage, setStage] = useState('');

    useEffect(() => {
        if (question) {
            setText(question.text);
            setStage(question.stage);
        }
    }, [question]);

    const handleSubmit = () => {
        if (!text || !stage) return;
        onSave({text, stage});
    };

    return (
        <div className="p-3">
            <div className="p-field mb-2">
                <label>Texto</label>
                <InputText value={text} onChange={(e) => setText(e.target.value)} className="w-full"/>
            </div>
            <div className="p-field mb-3">
                <label>Etapa</label>
                <Dropdown
                    value={stage}
                    options={stages}
                    onChange={(e) => setStage(e.value)}
                    placeholder="Seleccione etapa"
                    className="w-full"
                />
            </div>
            <div className="flex justify-content-end gap-2">
                <Button label="Cancelar" className="p-button-secondary" onClick={onCancel}/>
                <Button label="Guardar" onClick={handleSubmit}/>
            </div>
        </div>
    );

}


export default QuestionForm;