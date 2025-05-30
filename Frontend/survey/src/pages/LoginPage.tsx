import {useState} from "react";
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { loginService } from '../services/AuthService.ts';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const { token, user } = await loginService(email, password);
            auth.login(token, user);
            navigate('/dashboard');
        } catch (error) {
            alert( error instanceof Error ? error.message : 'Error desconocido');
        }
    };

    return (
        <div className="p-5" style={{ maxWidth: '400px', margin: 'auto' }}>
            <h2>Login</h2>
            <div className="p-field">
                <label htmlFor="email">Correo</label>
                <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full" />
            </div>
            <div className="p-field">
                <label htmlFor="password">Contraseña</label>
                <Password id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full" toggleMask />
            </div>
            <Button label="Entrar" onClick={handleSubmit} className="mt-3 w-full" />
        </div>
    );

}

export default LoginPage;