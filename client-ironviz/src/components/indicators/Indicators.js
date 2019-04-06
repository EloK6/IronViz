import React, { Component } from "react";
import BubbleChart from "./BubbleChart";
import NavBar from "../NavBar";
import Footer from "../Footer";

class Indicators extends Component {
  processStatePass = state => {
    console.log("statePassed");
    console.log(state);
  };
  render() {
    return (
      <div className="Indicators">
        <NavBar />
        <div className="Indicators__dataviz">
          <BubbleChart
            width={800}
            height={600}
            marginLeft={30}
            marginRight={30}
            marginTop={30}
            marginBottom={30}
            statePass={this.processStatePass}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Indicators;
