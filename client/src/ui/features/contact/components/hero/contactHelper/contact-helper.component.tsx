import React from 'react';
import {strings} from "../../../../../../i18n/strings.ts";
import "./contact-helper.styles.scss"
import {heroContactLeftItems} from "../../../../../../data/contact-us/contact-us.data.tsx";

const ContactHelper : React.FC = () => {
    return (
        <div className="left">
            <span className="here-to-help">{strings.contactUs.hereToHelp}</span>
            <h1 className="title">{strings.contactUs.contact}</h1>
            <h4 className="tell-us">{strings.contactUs.tellUsMore}</h4>
            <div className="helpers-container flex">
                {heroContactLeftItems.map(item => (
                    <div className="card" key={item.id}>
                        <div className="icon-wrapper">
                            {item.Icon}
                        </div>
                        <h3 className="title">{item.title}</h3>
                        <p className="description">{item.description}</p>
                    </div>
                ))}
            </div>
            <hr className="hr"/>
        </div>
    );
};

export default ContactHelper;