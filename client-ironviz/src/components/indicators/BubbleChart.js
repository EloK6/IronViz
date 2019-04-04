import React, { Component } from "react";
import * as d3 from "d3";

function getData() {
  let numItems = 195 + Math.floor(195 * Math.random());
  let data = [];
  for (let i = 0; i < numItems; i++) {
    data.push({
      x: Math.random(),
      y: Math.random(),
      r: Math.random(),
      colour: i % 5
    });
  }
  return data;
}

class BubbleChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: getData()
    };

    this.updateStyleAndAttrs = this.updateChart.bind(this);
  }

  // handleClick() {
  //   this.setState({
  //     data: getData()
  //   });
  // }

  componentDidMount() {
    this.updateChart();
  }

  componentDidUpdate() {
    this.updateChart();
  }

  updateChart() {
    let maxRadius = 20;
    let xScale = d3
      .scaleLinear()
      .domain([0, 1])
      .range([0, this.props.width]);
    let yScale = d3
      .scaleLinear()
      .domain([0, 1])
      .range([this.props.height, 0]);
    let rScale = d3
      .scaleLinear()
      .domain([0, 1])
      .range([0, maxRadius]);

    let dataviz = d3
      .select(this.svgEl)
      .selectAll("circle")
      .data(this.state.data);

    dataviz
      .enter()
      .append("circle")
      .attr("cx", 0.5 * this.props.width)
      .attr("cy", 0.5 * this.props.height)
      .style("fill", "#fff")
      .merge(dataviz)
      .transition()
      .duration(1000)
      .attr("cx", d => xScale(d.x))
      .attr("cy", d => yScale(d.y))
      .attr("r", d => rScale(d.r))
      .style("fill", "blue");

    dataviz.exit().remove();
  }

  render() {
    return (
      <div>
        <svg
          width={this.props.width}
          height={this.props.height}
          ref={element => (this.svgEl = element)}
        />
      </div>
    );
  }
}

export default BubbleChart;
