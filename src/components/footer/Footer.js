import React, { Fragment } from "react";
import {Link} from 'react-router-dom'

import './footer.css'

const Footer = () => {
  return (
    <Fragment>
      <footer id="footer" className="footer">
        <div className="content">
          <div className="container">
            <div className="row">
              <div className="col-md-4 text-center">
                <h3>Ubicación</h3>
                <p>
                  ???? <br />
                  Valparaiso, Chile
                </p>
                <Link className="link" style={{ color: "#ffffff", textDecoration: "none" }} to="/policy">Privacy & Policy</Link>
              </div>
              <div className="col-md-4 text-center">
                <h3>Social</h3>
                <div className="icon">
                  <a href="https://www.facebook.com/ignacio.cortesruz/" target="_blank">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="https://www.linkedin.com/in/ignacio-cort%C3%A9s-765182222/" target="_blank">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="https://github.com/Blaystramp" target="_blank">
                    <i className="fab fa-github"></i>
                  </a>
                </div>
              </div>
              <div className="col-md-4 text-center">
                <h3>Acerca de petLooker</h3>
                <p>
                  Adopta, publica, regala, pero siempre con amor
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="f-bottom text-center">
          <div className="container">
            <h4> &copy; 2022 petLooker </h4>
            <p>
              Made With <i className="fas fa-heart"></i> {" "}
              <span className="author">Love</span>
            </p>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;