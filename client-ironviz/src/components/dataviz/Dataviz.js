import React, { Component } from "react";
import NavBar from "../NavBar";
import Footer from "../Footer";
import Chart from "./Chart";
import Button from "./Button";

class Dataviz extends Component {
  render() {
    return (
      <div className="Dataviz">
        <NavBar />
        <div className="Dataviz__content">
          <Button />
          <Chart />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Dataviz;
