import React from 'react';
import ContactHelper from "./contactHelper/contact-helper.component.tsx";
import ContactUsForm from "./contactUsForm/contact-us-form.tsx";
import "./contact-hero.styles.scss"
const ContactHero : React.FC = () => {
    return (
        <div className="contact-us-hero">
            <ContactHelper/>
            <ContactUsForm />
        </div>
    );
};

export default ContactHero;