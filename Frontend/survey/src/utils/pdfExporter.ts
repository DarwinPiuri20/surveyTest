import jsPDF from 'jspdf';
import autoTable from "jspdf-autotable";
import type { HistoryAssessment, Seller } from "../types";

export const exportPdfEvaluation = (seller: Seller, assessments: HistoryAssessment[]) => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text(`Evaluaciones de ${seller.name}`, 14, 20);

    doc.setFontSize(12);
    doc.text(`Evaluaciones: ${assessments.length}`, 14, 25);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 30);

    // Calcular promedio de score
    const avgScore = assessments.length
        ? (assessments.reduce((sum, a) => sum + (a.score ?? 0), 0) / assessments.length).toFixed(2)
        : 'N/A';
    doc.text(`Score: ${avgScore}/10`, 14, 35);

    // Usar el primer assessment para la tabla (ajusta según tu lógica)
    const first = assessments[0];

    autoTable(doc, {
        startY: 55,
        head: [['Categoría', 'Contenido']],
        body: first ? [
            ['Observación', first.observation],
            ['Fortalezas', first.feedback.strengths],
            ['Áreas de mejora', first.feedback.improvements],
            ['Recomendaciones', first.feedback.recommendations],
        ] : [],
        styles: { cellWidth: 'wrap' },
        headStyles: { fillColor: [41, 128, 185] },
    });

    doc.save(`evaluacion_${seller.name}_${Date.now()}.pdf`);
}