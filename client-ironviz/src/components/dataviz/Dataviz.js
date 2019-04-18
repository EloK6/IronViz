import React, { Component } from "react";
import NavBar from "../NavBar";
import Footer from "../Footer";
import Chart from "./Chart";
import Button from "./Button";

class Dataviz extends Component {
  state = {};

  onChangeSplit = name => {
    console.log({ name });
    this.setState({ onChange: name });
  };

  render() {
    return (
      <div className="Dataviz">
        <NavBar />
        <div className="Dataviz__content">
          <Button onChanged={this.onChangeSplit} />
          <Chart onChange={this.state.onChange} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Dataviz;
