import React, { Component } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

class HomePage extends Component {
  render() {
    return (
      <div className="HomePage">
        <NavBar />
        <div className="HomePage__content">
          <div className="HomePage__text">
            <h1>IronViz</h1>
            <p>
              The purpose was a dataviz challenge about World Data.The focus is
              how governments are improving citizens’ lives – via environment,
              happiness, technology or other areas of support. From different
              databases, we provide data-visualizations that tell a story or
              reveal something interesting about the data.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default HomePage;
