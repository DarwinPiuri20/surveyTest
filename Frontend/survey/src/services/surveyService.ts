import axios from 'axios';
import type { AssessmentPayload, FeedbackIA } from '../types/index.ts';

export const submitSurvey = async (data: AssessmentPayload): Promise<FeedbackIA> => {
    const res = await axios.post('/api/evaluaciones', data);
    return res.data.feedback;
}