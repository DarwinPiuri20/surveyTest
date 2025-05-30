import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import type{ HistoryAssessment,Seller } from '../types';

export const exportExcelHistory = (seller: Seller, history: HistoryAssessment[]) => {
    const data = history.map((ev) => ({
        Date: new Date(ev.date).toLocaleDateString(),
        Score: ev.score,
        Observation: ev.observation,
        Strengths: ev.feedback.strengths,
        'Áreas de Mejora': ev.feedback.improvements,
        Recommendations: ev.feedback.recommendations,
    }));

    const sheet = XLSX.utils.json_to_sheet(data);
    const book = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, sheet, 'Evaluaciones');

    const fileName = `Historial_Evaluaciones_${seller.name}.xlsx`;
    const buffer = XLSX.write(book, { bookType: 'xlsx', type: 'array' });

    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    saveAs(blob, fileName);
};