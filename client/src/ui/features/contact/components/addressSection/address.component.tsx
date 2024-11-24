import React from 'react';
import "./address.style.scss"
import {addressData} from "../../../../../data/contact-us/contact-address.data.tsx";

const ContactAddress: React.FC = () => {
    return (
        <div className="address-section address-wrapper">
            {addressData.map((address) => (
                <div className="card" key={address.id}>
                    {address.Icon}
                    <h3 className={`card-title`}>{address.title}</h3>
                    <p className="card-content">{address.content}</p>
                </div>
            ))}
        </div>
    );
};

export default ContactAddress;