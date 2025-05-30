import axios from "axios";
import type {Question} from "../types/index";

export const getQuestions = async (): Promise<Question[]> => {
    const response = await axios.get<Question[]>('/api/questions');
    return response.data;
};

