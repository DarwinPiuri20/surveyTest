import { NavLink } from 'react-router-dom';

const ValidatorSidebar = () => (
    <div className="surface-200 h-full p-3" style={{ width: '220px' }}>
        <h4>Validador</h4>
        <ul className="list-none p-0">
            <li><NavLink to="/dashboard"> Inicio</NavLink></li>
            <li><NavLink to="/evaluar"> Evaluar</NavLink></li>
            <li><NavLink to="/historial">Historial</NavLink></li>
        </ul>
    </div>
);

export default ValidatorSidebar;
