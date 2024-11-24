import React from "react";
import "./about.styles.scss"
import Header from "../components/header/header.component.tsx";
import BestDestination from "../components/bestDestination/best-destination.component.tsx";
import WhyChooseUs from "../components/whyChooseUs/why-choose-us.component.tsx";

const About: React.FC = () => {
    return (
        <div className="about">
            <Header/>
            <WhyChooseUs />
            <BestDestination />
        </div>
    );
};

export default About;
