import {useAuth} from "../../context/AuthContext.tsx";
import {Button} from "primereact/button";

const ShareNavbar = () => {
    const { user, logout } = useAuth();

    return (
        <div className="flex justify-content-between align-items-center p-3 border-bottom surface-100">
            <h3 className="m-0">Evaluación Comercial</h3>
            <div className="flex align-items-center gap-3">
                <span>{user?.nombre} ({user?.rol})</span>
                <Button label="Salir" icon="pi pi-sign-out" className="p-button-sm p-button-secondary" onClick={logout} />
            </div>
        </div>
    );
};

export default ShareNavbar;