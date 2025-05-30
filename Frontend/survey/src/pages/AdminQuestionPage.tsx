import {useEffect,useState} from "react";
import {getQuestions,createQuestions,updateQuestions,deleteQuestions} from "../api/questions.ts";
import type{Question}   from "../types";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import QuestionForm from "../components/QuestionForm.tsx";

const AdminQuestionPage = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [visible, setVisible] = useState(false);
    const [editing, setEditing] = useState<Question | null>(null);

    const load = async () => {
        const data = await getQuestions();
        setQuestions(data);
    };

    useEffect(() => {
        load();
    }, []);

    const handleSave = async (data: Omit<Question, 'id'>) => {
        if (editing) {
            await updateQuestions(editing.id, data);
        } else {
            await createQuestions(data);
        }
        setVisible(false);
        setEditing(null);
        load();
    };

    const handleDelete = async (id: number) => {
        if (confirm('¿Deseas eliminar esta pregunta?')) {
            await deleteQuestions(id);
            load();
        }
    };

    return (
        <div className="p-5">
            <h2>Administrar Preguntas</h2>

            <Button label="Nueva Pregunta" icon="pi pi-plus" onClick={() => { setEditing(null); setVisible(true); }} className="mb-3" />

            <DataTable value={questions} paginator rows={10} responsiveLayout="scroll">
                <Column field="id" header="ID" />
                <Column field="texto" header="Pregunta" />
                <Column field="etapa" header="Etapa" />
                <Column
                    header="Acciones"
                    body={(row) => (
                        <div className="flex gap-2">
                            <Button icon="pi pi-pencil" onClick={() => { setEditing(row); setVisible(true); }} />
                            <Button icon="pi pi-trash" className="p-button-danger" onClick={() => handleDelete(row.id)} />
                        </div>
                    )}
                />
            </DataTable>

            <Dialog header={editing ? 'Editar Pregunta' : 'Nueva Pregunta'} visible={visible} onHide={() => setVisible(false)} breakpoints={{ '960px': '95vw' }} style={{ width: '500px' }}>
                <QuestionForm question={editing!} onSave={handleSave} onCancel={() => setVisible(false)} />
            </Dialog>
        </div>
    );
};

export default AdminQuestionPage;