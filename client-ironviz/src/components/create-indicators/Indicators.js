import React, { Component } from "react";
import BubbleChart from "./BubbleChart";
import SelectAxis from "./SelectAxis";
import NavBar from "../NavBar";
import Footer from "../Footer";

class Indicators extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xAxisValue: "happy planet index",
      yAxisValue: "GDP per capita (PPP)"
    };
  }

  handleDataXAxis = selection => {
    this.setState({ xAxisValue: selection });
    console.log("hellooo", selection);
  };

  handleDataYAxis = selection2 => {
    this.setState({ yAxisValue: selection2 });
  };

  render() {
    return (
      <div className="Indicators">
        <NavBar />
        <div className="Indicators__dataviz">
          <SelectAxis
            handleDataX={this.handleDataXAxis}
            handleDataY={this.handleDataYAxis}
          />
          <BubbleChart
            xAxisValue={this.state.xAxisValue}
            yAxisValue={this.state.yAxisValue}
            width={800}
            height={600}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Indicators;
