import React from 'react';
import './contact.screen.scss';
import ContactHero from "../components/hero/contact-hero.component.tsx";
import ContactAddress from "../components/addressSection/address.component.tsx";
import FAQSection from "../components/faqSection/faq-section.component.tsx";

const Contact: React.FC = () => {


  return (
      <div className="contact-us-section">
          <ContactHero />
          <ContactAddress/>
          <FAQSection />
      </div>
  );
};

export default Contact;
