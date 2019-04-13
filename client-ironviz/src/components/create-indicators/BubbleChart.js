import React, { Component } from "react";
import axios from "axios";
import * as d3 from "d3";
import d3Tip from "d3-tip";

class BubbleChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.innerMargin = { top: 20, bottom: 40, left: 50, right: 20 };
    this.innerWidth =
      this.props.width - this.innerMargin.left - this.innerMargin.right;
    this.innerHeight =
      this.props.height - this.innerMargin.top - this.innerMargin.bottom;
  }

  getData = () => {
    axios.get(`http://localhost:5000/api/countries`).then(responseFromApi => {
      this.setState({
        data: responseFromApi.data
      });
    });
  };

  componentDidMount() {
    this.updateChart();
    this.renderXAxis();
    this.renderYAxis();
    this.getData();
  }

  componentDidUpdate() {
    this.updateChart();
    this.renderXAxis();
    this.renderYAxis();
  }

  updateChart() {
    //Props du parent
    const xAxisValue = this.props.xAxisValue;
    const yAxisValue = this.props.yAxisValue;
    const rAxisValue = this.props.rAxisValue;

    //xScale
    let xScale = this.getXScale(xAxisValue);

    //yScale
    let yScale = this.getYScale(yAxisValue);

    //Radius
    let maxRadius = d3.max(
      this.state.data.map(d =>
        d.indicator_id.find(indic => indic.key === rAxisValue)
      ),
      d => d.value
    );
    let rScale = d3
      .scaleLinear()
      .domain([1, maxRadius])
      .range([5, 60]);

    //Color
    let color = d3
      .scaleOrdinal()
      .domain([this.state.data.map(d => d.region)])
      .range(["#FF8370", "#AA66E8", "#7DDAFF", "#68E866", "#FFE36B"]);
    //Tooltip
    const tip = d3Tip();
    tip.attr("class", "d3-tip").html(d => {
      console.log(d);
      return `<div class="BubbleChart__Hover">${d.name}</div>`;
    });

    //dataviz
    let viz = d3.select(this.svgEl);
    viz.call(tip);
    viz
      .selectAll("circle")
      .data(this.state.data)
      .on("mouseover", function(d) {
        tip.show(d, this);
      })
      .on("mouseout", function(d) {
        tip.hide(d, this);
      })
      .transition()
      .duration(2000)
      .attr("cx", d =>
        xScale(d.indicator_id.find(indic => indic.key === xAxisValue).value)
      )
      .attr("cy", d =>
        yScale(d.indicator_id.find(indic => indic.key === yAxisValue).value)
      )
      .attr("r", d => {
        let found = d.indicator_id.find(indic => {
          return indic.key === rAxisValue;
        });
        return rScale(found.value);
      })
      .style("fill", d => color(d.region))
      .style("opacity", 0.65)
      .style("stroke", "white");

    return { xScale, yScale, innerMargin: this.innerMargin };
  }

  getXScale(xAxisValue) {
    let xMax = d3.max(
      this.state.data.map(d =>
        d.indicator_id.find(indic => indic.key === xAxisValue)
      ),
      d => d.value
    );
    let xScale = d3
      .scaleLinear()
      .domain([0, xMax])
      .range([this.innerMargin.left, this.innerMargin.left + this.innerWidth]);
    return xScale;
  }

  getYScale(yAxisValue) {
    let yMax = d3.max(
      this.state.data.map(d =>
        d.indicator_id.find(indic => indic.key === yAxisValue)
      ),
      d => d.value
    );

    let yScale = d3
      .scaleLinear()
      .domain([0, yMax])
      .range([this.innerMargin.top + this.innerHeight, this.innerMargin.top]);
    return yScale;
  }

  //renderXAxis
  renderXAxis() {
    const xAxisValue = this.props.xAxisValue;

    let xScale = this.getXScale(xAxisValue);

    const axis = d3.axisBottom(xScale);
    d3.select(this.refs.g1).call(axis);
  }

  //renderYAxis
  renderYAxis() {
    const yAxisValue = this.props.yAxisValue;
    let yScale = this.getYScale(yAxisValue);

    const axis = d3.axisLeft(yScale);
    d3.select(this.refs.g2).call(axis);
  }

  //XAxis-Text
  // renderTextXAxis() {
  //   d3.select(this.refs.g1)
  //     .append("text")
  //     .attr("y", 120)
  //     .attr("x", 120)
  //     .attr("dy", "1em")
  //     .style("text-anchor", "middle")
  //     .text("Value");
  // }

  render() {
    let points = this.state.data.map(d => (
      <circle cx="0" cy="0" r="0" style={{ fill: "white" }} />
    ));

    return (
      <div className="BubbleChart">
        <svg
          className="svgContent"
          preserveAspectRatio="xMidYMid meet"
          viewBox={`0 0 ${this.props.width} ${this.props.height}`}
          width={this.props.width}
          height={this.props.height}
          ref={element => (this.svgEl = element)}
        >
          <g
            transform={`translate(${0}, ${this.props.height -
              this.innerMargin.bottom})`}
            ref="g1"
          />
          <g transform={`translate(${this.innerMargin.left}, ${0})`} ref="g2" />
          {points}
        </svg>
      </div>
    );
  }
}

export default BubbleChart;
