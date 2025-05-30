import ShareNavbar from "../components/sidebar/ShareNavbar.tsx";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/sidebar/AdminSidebar.tsx";

const AdminLayout = () => {
    return (
        <div className="h-screen flex flex-column">
            <ShareNavbar />
            <div className="flex flex-1">
                <AdminSidebar />
                <div className="p-4 flex-1 overflow-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;