import ShareNavbar from "../components/sidebar/ShareNavbar.tsx";
import ValidatorSidebar from "../components/sidebar/ValidatorSidebar.tsx";
import { Outlet } from "react-router-dom";


const ValidadorLayout = () => {
    return (
        <div className="h-screen flex flex-column">
            <ShareNavbar />
            <div className="flex flex-1">
                <ValidatorSidebar />
                <div className="p-4 flex-1 overflow-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default ValidadorLayout;