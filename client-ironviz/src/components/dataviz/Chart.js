import React, { Component } from "react";
import * as d3 from "d3";
import axios from "axios";
import _ from "lodash";

function Node() {
  const MAXVALUE = 1000000;
  this.x = 0;
  this.y = 0;
  this.value = Math.random() * MAXVALUE;
  this.radius = Math.random() * 25;
}
const json = [...Array(195)].map(el => new Node());

class Chart extends React.Component {
  static defaultProps = {
    width: 800,
    height: 600,
    forceStrength: 0.02,
    velocityDecay: 0.1
  };

  constructor(props) {
    super(props);

    const { width, height, forceStrength, velocityDecay } = this.props;

    this.state = {
      nodes: json
    };

    //
    // d3-force simulation
    //

    function charge(d) {
      return -forceStrength * Math.pow(d.radius, 2);
    }
    this.nodes = _.cloneDeep(this.state.nodes);
    this.simulation = d3
      .forceSimulation(this.nodes)
      .velocityDecay(velocityDecay)
      .force(
        "x",
        d3
          .forceX()
          .strength(forceStrength)
          .x(d => {
            return width / 2;
          })
      )
      .force(
        "y",
        d3
          .forceY()
          .strength(forceStrength)
          .y(d => {
            return height / 2;
          })
      )
      .force("charge", d3.forceManyBody().strength(charge))
      .force("collision", d3.forceCollide().radius(d => d.radius))
      .on("tick", this.ticked);
  }

  ticked = () => {
    // https://stackoverflow.com/a/46865234/133327
    this.setState({ nodes: _.cloneDeep(this.nodes) });
  };

  render() {
    const { width, height } = this.props;

    return (
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {this.state.nodes.map(node => (
          <circle
            key={node.id}
            r={node.radius}
            cx={node.x}
            cy={node.y}
            fill="blue"
            stroke="white"
          />
        ))}
      </svg>
    );
  }
}

export default Chart;
