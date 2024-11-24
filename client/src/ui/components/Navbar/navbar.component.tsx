import React, { useState } from "react";
import "./navbar.styles.scss";
import { Link, useLocation } from "react-router-dom";
import { dropdownItems, dropdownTravelerAuthItems, items } from "../../../data/navbar.data.ts";
import { ReactComponent as Avatar } from "../../../assets/svg/avatar.svg";
import { ReactComponent as BurgerButton } from "../../../assets/svg/burger-button.svg";
import { ReactComponent as ArrowRight } from "../../../assets/svg/right-arrow.svg";
import blackLogo from "../../../assets/images/logo/black-logo.png";
import jasmineTripLogo from "../../../assets/images/logo/icon.png";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import { strings } from "../../../i18n/strings";
import { useAuth } from "../../../contexts/traveler-auth.context.tsx";
import Modal from "../modal/modal.component";
import api from "../../../utils/api.ts"; // Import the Modal component

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Add state for modal
  const pathname = useLocation().pathname;
  const ref = useOutsideClick(() => {
    setIsDropdownOpen(false);
  });
  const { isAuthenticated } = useAuth();

  const dropDownLinks = isAuthenticated ? dropdownTravelerAuthItems : dropdownItems;

  const isLogoutItem = (title: string) => {
    return title === strings.navbar.logout;
  };

  const onClicktoggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout'); // Call the logout API
      console.log("logged out"); // Log out the user
      setIsModalOpen(false); // Close modal after logging out
      window.location.href = `/${strings.navbar.signin}`; // Refresh the page
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
      <>
        <header className="header flex">
          <div className="logo-container">
            <Link to="./" className="jaro logo-title">
              <img className="img-logo" src={jasmineTripLogo} alt="" />
            </Link>
          </div>
          <nav className="navbar-container">
            <ul className="navbar-list flex relative">
              {items.map((item) => (
                  <li
                      className={`${
                          `.${pathname}` === item.link ? "active " : ""
                      } nav-item relative `}
                      key={item.id}
                  >
                    <Link title={item.text} className="nav-item-link" to={item.link}>
                      {item.text}
                    </Link>
                  </li>
              ))}
              <li className="indicator absolute"></li>
            </ul>
          </nav>
          <div className="account-container flex">
            <Link to="./" className={`call-to-action-registration relative`}>
              <span>{strings.navbar.CTA}</span>
              <ArrowRight className="arrow-icon" />
            </Link>
            <div
                ref={ref}
                className="account-content flex relative pointer"
                onClick={onClicktoggleDropdown}
            >
              <div className="burger-button">
                <BurgerButton className="burger-icon" />
              </div>
              <div className="avatar-image">
                <Avatar className="avatar-icon" />
              </div>
              {isDropdownOpen && (
                  <div className="dropdown-menu absolute">
                    <ul className="dropdown-group">
                      {dropDownLinks.map((item) => (
                          <li
                              key={item.id}
                              className={`dropdown-item 
                      ${`.${pathname}` === item.link ? "active " : ""}
                      ${isLogoutItem(item.text) && "logout-item "}`}
                              onClick={() => {
                                if (isLogoutItem(item.text)) {
                                  setIsModalOpen(true); // Open modal on logout click
                                }
                              }}
                          >
                            {!isLogoutItem(item.text) ? (
                                <Link className="dropdown-item-link" to={item.link}>
                                  {item.text}
                                </Link>
                            ) : (
                                <div className="logout-button">{item.text}</div>
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

export default Navbar;
