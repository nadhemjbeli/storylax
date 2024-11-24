import React from "react";
import { ReactComponent as Send } from "../../../assets/svg/send-icon.svg";
import logo from "../../../assets/images/logo/footer-logo.png";
import "./footer.styles.scss";
import { strings } from "../../../i18n/strings.ts";
import { socialsMadia } from "../../../data/socials-media.data.tsx";
import { footerData } from "../../../data/footer.data.ts";

const Footer: React.FC = () => {
  return (
    <footer className="footer container flex">
      <div className="footer-col">
        <h4 className="company-title jaro"><img className='img' src={logo} alt="jasmine trip"/></h4>
        <p className="destination">destination, tunisia</p>
        <div className="social-links flex">
          {socialsMadia.map((socialMedia) => (
            <a
              key={socialMedia.id}
              href={socialMedia.url}
              className="link flex"
            >
              {socialMedia.icon}
            </a>
          ))}
        </div>
      </div>
      {footerData.map((elem) => (
        <div className="footer-col" key={elem.id}>
          <h4 className="footer-title">{elem.title}</h4>
          <ul className="links-group">
            {elem.links.map((link) => (
              <li className="link-item" key={link.text}>
                <a className="link-href" href={link.href}>
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="footer-col">
        <h4 className="footer-title">
          {strings.footer.title.newsletter.title}
        </h4>
        <p>{strings.footer.title.newsletter.caption}</p>
        <div className="form">
          <input
            type="email"
            className="email"
            placeholder={"your email adress"}
          />
          <button className="btn flex">
            <Send className="send-icon" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
