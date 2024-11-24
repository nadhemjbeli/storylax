import "./call-to-action.component.scss";
import hammametBeach from "../../../../../assets/images/hammamet-beach.jpg";
import { ReactComponent as RightArrow } from "../../../../../assets/svg/right-arrow.svg";

const CallToAction = () => {
  return (
    <div className="call-to-action-section">
      <div className="home-section">
        <div className="content">
          <div className="left-part">
            <h2 className="title">
              Prepare yourself & Let's Explore The Beauty of the world
            </h2>
            <div className="btn-container">
              <RightArrow className="arrow-icon" />
              <button className="call-to-action-btn">Call to action</button>
            </div>
          </div>
          <div className="card">
            <img className="card-image" src={hammametBeach} alt="" />
            <div className="card-content">
              <h3 className="card-title">Yasmine El hammamet</h3>
            </div>
            <div className="inner-cards">
              <div className="left inner-card">
                <h3 className="text">Family Friendly</h3>
              </div>
              <div className="right inner-card">
                <h3 className="text">1.2M visitors</h3>
              </div>
              <div className="down inner-card">
                <h3 className="text">Fun activities</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
