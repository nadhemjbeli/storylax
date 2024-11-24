import React from "react";
import "./home.style.scss";
import HomeHeader from "../components/homeHeader/home-header.component.tsx";
import Advantages from "../components/advantage/advantage.component.tsx";
import bigEvent from "../../../../assets/images/home/big-event/background-with-texte.jpg";
import Testimonial from "../components/testimonial/testimonial.component.tsx";
import CallToAction from "../components/callToAction/call-to-action.component.tsx";
import Testimonials from "../components/testimonials/testimonials.component.tsx";

interface HomeHeaderProps {
  // Add any props you want to pass to the Home component here
}

const Home: React.FC<HomeHeaderProps> = () => {
  return (
    <div className="all-header home">
      <HomeHeader />
        <div
            className="big-event container"
        >
        </div>
      <Advantages />
      {/*<Testimonial />*/}
      <Testimonials />
    </div>
  );
};

export default Home;
