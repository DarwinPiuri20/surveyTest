import {useEffect,useState} from "react";
import {getHistoryAssessment} from "../api/assessment.ts";
import type{ HistoryAssessment,Seller } from "../types/index.ts";
import {getSellers} from "../api/seller.ts";
import {Dropdown} from "primereact/dropdown";
import {Card} from "primereact/card";
import {exportPdfEvaluation} from "../utils/pdfExporter.ts";
import {Button} from "primereact/button";
import {exportExcelHistory} from "../utils/excelExporter.ts";

const HistoryPage=()=>{
    const [sellers,setSellers]=useState<Seller[]>([]);
    const [seller,setSeller]=useState<Seller|null>(null)
    const [history,setHistory]=useState<HistoryAssessment[]>([]);

    useEffect(() => {
        getSellers().then(setSellers)
    }, []);

    useEffect(() => {
        if(seller){
            getHistoryAssessment(seller.id).then(setHistory)
        }else{
            setHistory([]);
        }
    }, [seller]);


    return(
    <div className="p-5">
        <h2 className="mb-4">Historial de Evaluaciones</h2>

        <div className="p-field mb-4" style={{ maxWidth: 300 }}>
            <label>Seleccionar Vendedor</label>
            <Dropdown
                value={seller}
                options={sellers}
                onChange={(e) => setSeller(e.value)}
                optionLabel="nombre"
                placeholder="Seleccione un vendedor"
                className="w-full"
            />
        </div>
        {seller && history.length > 0 && (
            <Button
                label="Exportar historial a Excel"
                icon="pi pi-file-excel"
                className="p-button-success mb-3"
                onClick={() => exportExcelHistory(seller, history)}
            />
        )}

        {history.map((item) => (
            <Card key={item.id} title={`Evaluación - ${new Date(item.date).toLocaleDateString()}`} className="mb-4">
                <p><strong>Score:</strong> {item.score}/10</p>
                <p><strong>Observación:</strong> {item.observation}</p>
                <hr />
                <p><strong>Fortalezas:</strong> {item.feedback.strengths}</p>
                <p><strong>Áreas de mejora:</strong> {item.feedback.improvements}</p>
                <p><strong>Recomendaciones:</strong> {item.feedback.recommendations}</p>

                <Button
                    label="Exportar PDF"
                    icon="pi pi-file-pdf"
                    onClick={() => exportPdfEvaluation(seller!, [item])}
                    className="mt-2 p-button-sm"
                />
            </Card>
        ))}
    </div>
);
}


export default HistoryPage;