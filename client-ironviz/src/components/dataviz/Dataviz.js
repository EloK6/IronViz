import React, { Component } from "react";
import NavBar from "../NavBar";
import Footer from "../Footer";
import Chart from "./Chart";

const nodeCount = 195;
const nodes = [];
for (let i = 0; i < nodeCount; i++) {
  nodes.push({
    r: Math.random() * 5 + 2,
    x: 0,
    y: 0
  });
}

const links = [];
for (let i = 0; i < nodeCount; i++) {
  let target = 0;
  do {
    target = Math.floor(Math.random() * nodeCount);
  } while (target == i);
  links.push({
    source: i,
    target
  });
}

class Dataviz extends Component {
  render() {
    return (
      <div className="Dataviz">
        <NavBar />
        <div className="Dataviz__content">
          <Chart nodes={this.props.nodes} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Dataviz;
