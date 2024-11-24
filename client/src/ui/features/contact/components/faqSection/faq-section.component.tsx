import React from 'react';
import "./faq-section.styles.scss";
import Faq from "./components/faq/faq.component.tsx";

const FAQSection:React.FC = () => {

    return (
        <div className="faq-section">
            <Faq />

        </div>
    );
};

export default FAQSection;