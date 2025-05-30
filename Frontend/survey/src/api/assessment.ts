import axios from 'axios';
import type{ HistoryAssessment } from '../types/index.ts';

export const getHistoryAssessment = async (sellerId: number): Promise<HistoryAssessment[]> => {
    const res = await axios.get(`/api/evaluaciones?vendedorId=${sellerId}`);
    return res.data;
};
