import React, { Component } from "react";
import NavBar from "../NavBar";
import Footer from "../Footer";

class Dataviz extends Component {
  render() {
    return (
      <div className="Dataviz">
        <NavBar />
        <div className="Dataviz__content">
          <svg
            className="bubbleChart"
            width={this.props.width}
            height={this.props.height}
          >
            {this.children}
          </svg>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Dataviz;
