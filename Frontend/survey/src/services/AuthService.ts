import axios from 'axios';
import type{AuthResponse} from '../types/auth';

export const loginService = async (email: string, password: string): Promise<AuthResponse> => {
    const res = await axios.post('/api/auth/login', { email, password });
    return res.data;
};
