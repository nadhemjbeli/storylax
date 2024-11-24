import {Outlet} from "react-router-dom";
import AdminSidebar from "../admin/components/sidebar/sidebar.component.tsx";
import AdminNavbar from "../admin/components/admin-navbar/admin-navbar.component.tsx";
const AdminLayout = () => {
    return (
        <div className='admin-page'>
            <AdminSidebar />
            <div className="admin-container">
                <AdminNavbar/>
                <main
                    className={`admin-main main-under-nav`}
                >
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
