import React, { Component } from "react";
import { Link } from "react-router-dom";

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="footer__content">
          Project IronHack <span>🦖</span>
          <Link
            to="www.linkedin.com/in/elodie-cassignol"
            className="footer__link"
          >
            {" "}
            EloK6
          </Link>
        </div>
      </footer>
    );
  }
}

export default Footer;
