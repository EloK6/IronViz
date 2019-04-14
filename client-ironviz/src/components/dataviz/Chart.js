import React, { Component } from "react";
import * as d3 from "d3";
import axios from "axios";
// import _ from "lodash";

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: this.props.nodes
    };
  }

  // componentDidMount() {
  //   this.force = d3
  //     .forceSimulation(this.state.nodes)
  //     .force("charge", d3.forceManyBody().strength(this.props.forceStrength))
  //     .force("x", d3.forceX(this.props.width / 2))
  //     .force("y", d3.forceY(this.props.height / 2));

  //   this.force.on("tick", () =>
  //     this.setState({
  //       nodes: this.state.nodes
  //     })
  //   );
  // }

  // componentWillUnmount() {
  //   this.force.stop();
  // }

  // render() {
  //   return (
  //     <svg
  //       width={this.props.width}
  //       height={this.props.height}
  //       viewBox={`0 0 ${this.props.width} ${this.props.height}`}
  //       preserveAspectRatio="xMidYMid meet"
  //     >
  //       {this.state.nodes.map((node, index) => (
  //         <circle r={node.r} cx={node.x} cy={node.y} fill="red" key={index} />
  //       ))}
  //     </svg>
  //   );
  // }
}

Chart.defaultProps = {
  width: 600,
  height: 600,
  forceStrength: -20
};

export default Chart;
