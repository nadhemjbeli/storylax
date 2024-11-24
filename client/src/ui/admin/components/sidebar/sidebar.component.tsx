import React, { useState } from "react";
import "./sidebar.style.scss";
import { adminSidebarData } from "../../../../data/admin/sidebar.data.ts";
import whiteLogo from "../../../../assets/images/logo/white-logo.png";
import { Link, useLocation } from "react-router-dom";

const AdminSidebar: React.FC = () => {
    const location = useLocation();
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="admin-sidebar-container">
            <div className="card">
                <div className="logo-container">
                    <img src={whiteLogo} alt="" className="logo-img"/>
                </div>
                <div className="list">
                    {adminSidebarData.map((tab, index) => (
                        <Link
                            key={tab.id}
                            to={tab.link ? tab.link : ""}
                            className={`sidebar-link ${(tab.link && location.pathname) === `/admin/${tab.link}` ? "active":
                                (!tab.link && location.pathname) === `/admin` ? "active"
                            : ""}`}
                            onClick={() => setActiveIndex(index)}
                        >
                            <i className={tab.iconClass}></i>
                            <span className="topic">{tab.label}</span>
                        </Link>
                    ))}
                    <div
                        className="indicator"
                        style={{
                            // top: `${activeIndex * 50}px`,
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default AdminSidebar;
