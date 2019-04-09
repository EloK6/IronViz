import React, { Component } from "react";
import * as d3 from "d3";
// import axios from "axios";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.updateChart();
    // this.getData();
  }

  componentDidUpdate() {
    this.updateChart();
  }

  updateChart() {
    var numNodes = 100;
    var nodes = d3.range(numNodes).map(function(d) {
      return { radius: Math.random() * 25 };
    });

    let simulation = d3
      .forceSimulation(nodes)
      .force("charge", d3.forceManyBody().strength(5))
      .force(
        "center",
        d3.forceCenter(this.props.width / 2, this.props.height / 2)
      )
      .force(
        "collision",
        d3.forceCollide().radius(function(d) {
          return d.radius;
        })
      )
      .on("tick", ticked);

    function ticked() {
      var u = d3
        .select(this.svgEl)
        .selectAll("circle")
        .data(nodes);

      u.enter()
        .append("circle")
        .attr("r", function(d) {
          return d.radius;
        })
        .merge(u)
        .attr("cx", function(d) {
          return d.x;
        })
        .attr("cy", function(d) {
          return d.y;
        });

      u.exit().remove();
    }
  }
  render() {
    return (
      <div className="Chart">
        <svg
          preserveAspectRatio="xMidYMid meet"
          viewBox={`0 0 ${this.props.width} ${this.props.height}`}
          width={this.props.width}
          height={this.props.height}
          ref={element => (this.svgEl = element)}
        />
      </div>
    );
  }
}

export default Chart;
