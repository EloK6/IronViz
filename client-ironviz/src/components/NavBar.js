import React, { Component } from "react";
import { Link } from "react-router-dom";
import baseline from "../baseline-graphic.svg";

class NavBar extends Component {
  render() {
    return (
      <div className="NavBar">
        <nav class="navbar navbar-expand-lg navbar-dark">
          <img src={baseline} alt="logo" class="navbar-brand" />
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
              <li className="nav-item active">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Main indicators
                </Link>
              </li>
              <li className="nav-item dropdown">
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
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;
