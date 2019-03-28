import React, { Component } from "react";
import { Link } from "react-router-dom";

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="footer__content">
          Project IronHack. We can hire me :
          <Link to="www.linkedin.com/in/elodie-cassignol"> EloK6</Link>
        </div>
      </footer>
    );
  }
}

export default Footer;
