export interface User {
    id: number;
    nombre: string;
    rol: 'admin' | 'validator';
}

export interface AuthResponse {
    token: string;
    user: User;
}
