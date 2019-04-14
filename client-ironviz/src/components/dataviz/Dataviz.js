import React, { Component } from "react";
import NavBar from "../NavBar";
import Footer from "../Footer";
import Chart from "./Chart";

class Dataviz extends Component {
  render() {
    return (
      <div className="Dataviz">
        <NavBar />
        <div className="Dataviz__content">
          <Chart width={960} height={600} forceStrength={-20} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Dataviz;
