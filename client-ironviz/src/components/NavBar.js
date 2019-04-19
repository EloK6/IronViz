import React, { Component } from "react";
import { Link } from "react-router-dom";
import baseline from "../baseline-graphic.svg";

class NavBar extends Component {
  render() {
    return (
      <div className="NavBar">
        <nav className="navbar navbar-expand-lg navbar-dark">
          <Link to="/" className="nav-link">
            <img src={baseline} alt="logo" className="navbar-brand" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              {/* <li className="nav-item active">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li> */}
              <li className="nav-item borderLeftRight">
                <Link to="/dataviz" className="nav-link">
                  Population in dataviz
                </Link>
              </li>
              <li className="nav-item borderLeftRight">
                <Link to="/countries" className="nav-link">
                  Countries
                </Link>
              </li>
              <li className="nav-item borderLeftRight">
                <Link to="/own-chart" className="nav-link">
                  Make your own chart
                </Link>
              </li>
              {/* <li className="nav-item dropdown">
                <Link
                  to="/"
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Profile
                </Link>

                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link to="/" className="dropdown-item">
                    Action
                  </Link>
                  <Link to="/" className="dropdown-item">
                    Another Action
                  </Link>
                </div>
              </li> */}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;
