import axios from 'axios';
import type{ Seller } from '../types/index';

export const getSellers = async (): Promise<Seller[]> => {
    const response = await axios.get<Seller[]>('/api/sellers');
    return response.data;
}


