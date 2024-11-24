import {Outlet} from "react-router-dom";
import HostNavbar from "../host/components/host-navbar/host-navbar.component.tsx";
import HostSidebar from "../host/components/sidebar/sidebar.component.tsx";
const HostLayout = () => {
    return (
        <div className='admin-page'>
            <HostSidebar />
            <div className="admin-container">
                <HostNavbar/>
                <main
                    className={`admin-main main-under-nav`}
                >
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default HostLayout;
