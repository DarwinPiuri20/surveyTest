import axios from 'axios';
import type{Question} from "../types";

export const getQuestions = async (): Promise<Question[]> => {
    const res = await axios.get('/api/preguntas');
    return res.data;
};

export const createQuestions = async (data: Omit<Question, 'id'>) => {
    const res = await axios.post('/api/preguntas', data);
    return res.data;
};

export const updateQuestions = async (id: number, data: Omit<Question, 'id'>) => {
    const res = await axios.put(`/api/preguntas/${id}`, data);
    return res.data;
};

export const deleteQuestions = async (id: number) => {
    const res = await axios.delete(`/api/preguntas/${id}`);
    return res.data;
};