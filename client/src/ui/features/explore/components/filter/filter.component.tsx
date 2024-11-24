import React, { useState } from 'react';
import './filter.style.scss';
import { ReactComponent as CloseIcon } from "../../../../../assets/svg/explore/close.icon.svg";
import { ReactComponent as BarsIcon } from "../../../../../assets/svg/explore/bras.icon.svg";
import { MenuItem, menuItems } from "../../../../../data/explore/filter.data.tsx";

const Filter: React.FC = () => {
    const [activeMenu, setActiveMenu] = useState<number>(0);

    const handleMenuClick = (id: number) => {
        setActiveMenu(id);
    };

    const closeMenu = () => {
        document.querySelectorAll('.ul-menu').forEach((menu) => {
            menu.setAttribute('style', 'bottom: -150%');
        });
    };

    const openMenu = (index: number) => {
        closeMenu();
        const menus = document.querySelectorAll('.ul-menu');
        if (menus[index]) {
            menus[index].setAttribute('style', 'bottom: 0');
        }
    };

    return (
        <div className="container filter-section">
            <div className="content">
                <div className="main-nav">
                    <ul className="ul">
                        {menuItems.map((menuItem: MenuItem) => (
                            <li key={menuItem.id} onClick={() => handleMenuClick(menuItem.id - 1)} className={`li-item ${activeMenu === menuItem.id - 1 ? 'active' : ''}`}>
                                <div className="settings-icon" onClick={() => openMenu(menuItem.id - 1)}>
                                    <BarsIcon />
                                </div>
                                <div className="ul-menu">
                                    {menuItem.settings && (
                                        <>
                                            <p className="title">Settings</p>
                                            {menuItem.settings}
                                            <div className="ul-menu-close" onClick={closeMenu}><CloseIcon /></div>
                                        </>
                                    )}
                                </div>
                                <div className={`menu-icon-container`}>
                                    {menuItem.icon && menuItem.icon}
                                </div>
                                <pre className="menu-title">{menuItem.name.charAt(0).toUpperCase() + menuItem.name.slice(1)}</pre>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Filter;
