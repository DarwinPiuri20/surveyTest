import {createContext, useState, useContext} from 'react';
import type{ReactNode} from 'react';
import type {User} from '../types/auth.ts';

interface AuthContextProps {
    user: User | null;
    token: string | null;
    login: (token: string, user: User) => void;
    logout: () => void;
}


const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({children}:{children:ReactNode}) => {
    const [user,setUser] = useState<User| null>(null);
    const [token, setToken] = useState<string | null>(()=>{
        const stored = localStorage.getItem('user');
        return stored ? JSON.parse(stored) : null;
    });



    const login = (token:string, userData:User)=>{
        localStorage.setItem('token',token);
        localStorage.setItem('user', JSON.stringify(userData));
        setToken(token);
        setUser(userData);
    }

    const logout = () => {
        localStorage.clear();
        setToken(null);
        setUser(null);
    }


    return (
        <AuthContext.Provider value={{user, token, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = ():AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}