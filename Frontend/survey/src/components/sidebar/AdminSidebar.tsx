import {NavLink} from "react-router-dom";

const AdminSidebar = () => (
    <div className="surface-200 h-full p-3" style={{ width: '220px' }}>
        <h4>Admin</h4>
        <ul className="list-none p-0">
            <li><NavLink to="/dashboard">Dashboard</NavLink></li>
            <li><NavLink to="/admin/preguntas">Preguntas</NavLink></li>
            <li><NavLink to="/admin/usuarios">Usuarios</NavLink></li>
        </ul>
    </div>
);

export default AdminSidebar;