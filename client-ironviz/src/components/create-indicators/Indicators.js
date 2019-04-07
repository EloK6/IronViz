import React, { Component } from "react";
import BubbleChart from "./BubbleChart";
import SelectAxis from "./SelectAxis";
import NavBar from "../NavBar";
import Footer from "../Footer";

class Indicators extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xAxisValue: ""
    };
  }

  handleDataXAxis = event => {
    this.setState({ xAxisValue: event });
  };

  render() {
    return (
      <div className="Indicators">
        <NavBar />
        <div className="Indicators__dataviz">
          <SelectAxis
          // handleDataX={this.handleDataXAxis}
          />
          <BubbleChart
            // xAxisValue={this.state.xAxisValue}
            width={800}
            height={600}
            marginLeft={50}
            marginRight={20}
            marginTop={50}
            marginBottom={50}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Indicators;
