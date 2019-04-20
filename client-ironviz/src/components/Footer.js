import React, { Component } from "react";
import { Link } from "react-router-dom";

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="footer__content">
          Project IronHack <span>🦖</span>
          <a href="http://www.linkedin.com/in/elodie-cassignol">EloK6</a>
        </div>
      </footer>
    );
  }
}

export default Footer;
