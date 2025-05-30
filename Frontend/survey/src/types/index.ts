export interface Question {
    id: number;
    stage: string;
    text: string;
}

export interface Answer {
    questionId: number;
    valor: number;
}

export interface AssessmentPayload {
    sellerId: number;
    answers: Answer[];
    observation: string;
}


export interface Seller {
    id: number;
    name: string;
}

export interface FeedbackIA {
    strengths: string;
    improvements: string;
    recommendations: string;
}

export interface HistoryAssessment {
    id: number;
    date: string;
    score: number;
    observation: string;
    feedback: {
        strengths: string;
        improvements: string;
        recommendations: string;
    };
}

export interface Question {
    id: number;
    stage: string;
    text: string;
}