import React from "react";
import "./advantage.styles.scss";
import { advantagesData } from "../../../../../data/advantages.data.tsx";
import { strings } from "../../../../../i18n/strings.ts";

interface AdvatagesProps {
  // Add any props you want to pass to the Home component here
}
const Advantages: React.FC<AdvatagesProps> = () => {
  return (
    <div className="advantage-section container">
      {/*<div className="title-part">*/}
      {/*  <h4 className="title">*/}
      {/*    {strings.advantagesHome.yourIdealDestinationPartner}*/}
      {/*  </h4>*/}
      {/*  <h5 className="subtitle">*/}
      {/*    {strings.advantagesHome.customersAreImportant}*/}
      {/*  </h5>*/}
      {/*</div>*/}
      <div className="content-part">
        {advantagesData.map((advantage) => (
          <div className="advantage-card" key={advantage.id}
          //   style={{
          //       background:`url(${advantage.back}) no-repeat center center`,
          //       backgroundSize: 'cover'
          // }}
          >
            <ul className="advantages-list">
              {advantage.advantages.map((item) => (
                <li className="advantage" key={item.id}>
                  <p>{item.value}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Advantages;
