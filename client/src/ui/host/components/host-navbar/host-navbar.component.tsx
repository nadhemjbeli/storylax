import React, { useState } from "react";
import "./host-navbar.style.scss";
import {Link, useLocation, useNavigate} from "react-router-dom";
import { dropdownHostItems } from "../../../../data/host/host-navbar.data";
import { ReactComponent as Avatar } from "../../../../assets/svg/avatar.svg";
import { ReactComponent as BurgerButton } from "../../../../assets/svg/burger-button.svg";
import { useOutsideClick } from "../../../../hooks/useOutsideClick";
import Modal from "../../../components/modal/modal.component";
import api from "../../../../utils/api.ts";
import {strings} from "../../../../i18n/strings.ts";

const HostNavbar:React.FC =()=> {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const pathname = useLocation().pathname;
    const ref = useOutsideClick(() => {
        setIsDropdownOpen(false);
    });
    // const { isAuthenticated } = useAuth();

    const isLogoutItem = (title: string) => {
        return title === "Logout"; // Adjust this to the appropriate logout text for host
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
            <header className="host-header flex">
                <div className="host-logo-container">
                    <Link to="/host" className="host-logo-title">
                        Host Panel
                    </Link>
                </div>
                <div className="host-account-container flex">
                    <div
                        ref={ref}
                        className="host-account-content flex relative pointer"
                        onClick={onClickToggleDropdown}
                    >
                        <div className="host-burger-button">
                            <BurgerButton className="burger-icon" />
                        </div>
                        <div className="host-avatar-image">
                            <Avatar className="avatar-icon" />
                        </div>
                        {isDropdownOpen && (
                            <div className="host-dropdown-menu absolute">
                                <ul className="host-dropdown-group">
                                    {dropdownHostItems.map((item) => (
                                        <li
                                            key={item.id}
                                            className={`host-dropdown-item 
                      ${`.${pathname}` === item.link ? "active " : ""}
                      ${isLogoutItem(item.text) && "logout-item "}`}
                                            onClick={() => { isLogoutItem(item.text) && setIsModalOpen(true)}}
                                        >
                                            {!isLogoutItem(item.text) ? (
                                                <Link className="host-dropdown-item-link" to={item.link}>
                                                    {item.text}
                                                </Link>
                                            ) : (
                                                <div className="host-logout-button">{item.text}</div>
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

export default HostNavbar;
