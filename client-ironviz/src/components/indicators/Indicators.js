import React, { Component } from "react";
import BubbleChart from "./BubbleChart";
import NavBar from "../NavBar";
import Footer from "../Footer";

class Indicators extends Component {
  getData = () => {
    let numItems = 20 + Math.floor(20 * Math.random());
    let data = [];
    for (let i = 0; i < numItems; i++) {
      data.push({
        x: Math.random(),
        y: Math.random(),
        r: Math.random(),
        colour: i % 5
      });
    }
    return data;
  };

  render() {
    return (
      <div className="Indicators">
        <NavBar />
        <div className="Indicators__dataviz">
          <BubbleChart width={800} height={600} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Indicators;
