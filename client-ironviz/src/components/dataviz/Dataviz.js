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
          <Chart
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

export default Dataviz;
