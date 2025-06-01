import axios from 'axios';

export const generateFeedback = async (sellerId: number) => {
    const response = await axios.get(`/api/feedback/${sellerId}`);
    return response.data;
};

export const getFeedbackHistory = async (sellerId: number) => {
    const response = await axios.get(`/api/feedback/history/${sellerId}`);
    return response.data;
};

export const downloadFeedbackPDF = async (sellerId: number) => {
    const response = await axios.get(`/api/feedback/pdf/${sellerId}`, {
        responseType: 'blob',
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `feedback_seller_${sellerId}.pdf`);
    document.body.appendChild(link);
    link.click();
};
