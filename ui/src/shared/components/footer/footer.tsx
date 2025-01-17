import React, { FunctionComponent } from "react";
import "./footer.scss";
import FooterLogo from "./OEF_logo_footer_small.svg";
import BetaCapsule from "./beta_capsule.svg";

const MainFooter: FunctionComponent<{}> = (props) => {
  return (
    <React.Fragment>
      <div className="footer">
        <div className="footer__line">
          <div className="footer__disclaimer">
            <img className="footer__beta" src={BetaCapsule} />
            <span className="footer__disclaimer__text">
              This site is a beta platform, we appreciate all feedback to
              improve the platform
            </span>
            <a className="footer__feedback" href="mailto:ux@openearth.org">
              Send feedback
            </a>
          </div>

          <div className="footer__poweredby">
            powered by{" "}
            <img className="footer__poweredby__logo" src={FooterLogo} />
          </div>
        </div>
        <div className="footer__line">
          <div className="footer__menu">
            <ul className="footer__menu__items">
              <li className="footer__menu__item">
                <a
                  className="footer__menu__link"
                  href="https://github.com/Open-Earth-Foundation/OpenClimate"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Go to GitHub
                </a>
              </li>
              <li className="footer__menu__item">
                <a
                  className="footer__menu__link"
                  href="https://wiki.climatedata.network/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  CAD 2.0 Community
                </a>
              </li>
              <li className="footer__menu__item">
                <a
                  className="footer__menu__link"
                  href="https://www.openearth.org/projects/openclimate"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  About OpenClimate
                </a>
              </li>
            </ul>
          </div>

          <div className="footer__contactus">
            <a
              className="footer__contactus__link"
              href="mailto:info@openearth.org"
            >
              Contact us
            </a>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MainFooter;
