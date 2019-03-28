import React, { Component } from "react";
import { Link } from "react-router-dom";

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        © 2018 Copyright:
        <Link to="www.linkedin.com/in/elodie-cassignol"> EloK6</Link>
      </footer>
    );
  }
}

export default Footer;
