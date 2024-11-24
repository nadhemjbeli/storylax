import React, { useState } from "react";
import "./admin-navbar.style.scss";
import {Link, useLocation, useNavigate} from "react-router-dom";
import { dropdownAdminItems } from "../../../../data/admin/admin-navbar.data";
import { ReactComponent as Avatar } from "../../../../assets/svg/avatar.svg";
import { ReactComponent as BurgerButton } from "../../../../assets/svg/burger-button.svg";
import { useOutsideClick } from "../../../../hooks/useOutsideClick";
import Modal from "../../../components/modal/modal.component";
import api from "../../../../utils/api.ts";
import {strings} from "../../../../i18n/strings.ts";

const AdminNavbar:React.FC =()=> {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const pathname = useLocation().pathname;
    const ref = useOutsideClick(() => {
        setIsDropdownOpen(false);
    });
    // const { isAuthenticated } = useAuth();

    const isLogoutItem = (title: string) => {
        return title === "Logout"; // Adjust this to the appropriate logout text for admin
    };

    const onClickToggleDropdown = () => {
        setIsDropdownOpen((prevState) => !prevState);
    };

    const handleLogout = async () => {
        try {
            await api.post('/auth/logout');
            console.log("Admin logged out");
            setIsModalOpen(false);
            navigate(`/${strings.navbar.signin}`)
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <>
            <header className="admin-header flex">
                <div className="admin-logo-container">
                    <Link to="/admin" className="admin-logo-title">
                        Admin Panel
                    </Link>
                </div>
                <div className="admin-account-container flex">
                    <div
                        ref={ref}
                        className="admin-account-content flex relative pointer"
                        onClick={onClickToggleDropdown}
                    >
                        <div className="admin-burger-button">
                            <BurgerButton className="burger-icon" />
                        </div>
                        <div className="admin-avatar-image">
                            <Avatar className="avatar-icon" />
                        </div>
                        {isDropdownOpen && (
                            <div className="admin-dropdown-menu absolute">
                                <ul className="admin-dropdown-group">
                                    {dropdownAdminItems.map((item) => (
                                        <li
                                            key={item.id}
                                            className={`admin-dropdown-item 
                      ${`.${pathname}` === item.link ? "active " : ""}
                      ${isLogoutItem(item.text) && "logout-item "}`}
                                            onClick={() => { isLogoutItem(item.text) && setIsModalOpen(true)}}
                                        >
                                            {!isLogoutItem(item.text) ? (
                                                <Link className="admin-dropdown-item-link" to={item.link}>
                                                    {item.text}
                                                </Link>
                                            ) : (
                                                <div className="admin-logout-button">{item.text}</div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Modal for logout confirmation */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2>Confirm Logout</h2>
                <p>Are you sure you want to log out?</p>
                <div className="modal-actions">
                    <button className='primary-button' onClick={handleLogout}>Yes, Logout</button>
                    <button className='primary-button' onClick={() => setIsModalOpen(false)}>Cancel</button>
                </div>
            </Modal>
        </>
    );
}

export default AdminNavbar;
