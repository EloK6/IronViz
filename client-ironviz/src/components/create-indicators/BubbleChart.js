import React, { Component } from "react";
import * as d3 from "d3";
import axios from "axios";

class BubbleChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
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
    this.getData();
  }

  componentDidUpdate() {
    this.updateChart();
  }

  updateChart() {
    //xScale
    let xMax = d3.max(
      this.state.data.map(d =>
        d.indicator_id.find(indic => indic.key === "happy planet index")
      ),
      d => d.value
    );

    let xScale = d3
      .scaleLinear()
      .domain([0, xMax])
      .range([0, this.props.width]);

    //yScale
    let yMax = d3.max(
      this.state.data.map(d =>
        d.indicator_id.find(indic => indic.key === "GDP per capita (PPP)")
      ),
      d => d.value
    );

    let yScale = d3
      .scaleLinear()
      .domain([0, yMax])
      .range([this.props.height, 0]);

    //Radius
    let maxRadius = d3.max(
      this.state.data.map(d =>
        d.indicator_id.find(indic => indic.key === "population")
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

    // Add X axis
    var x = d3
      .scaleLinear()
      .domain([0, xMax])
      .range([0, this.props.width]);

    //Add Y axis
    var y = d3
      .scaleLinear()
      .domain([0, yMax])
      .range([this.props.height, 0]);

    //dataviz
    d3.select(this.svgEl)
      .selectAll("circle")
      .data(this.state.data)
      .transition()
      .duration(2000)
      .attr("cx", d =>
        xScale(
          d.indicator_id.find(indic => indic.key === "happy planet index").value
        )
      )
      .attr("cy", d =>
        yScale(
          d.indicator_id.find(indic => indic.key === "GDP per capita (PPP)")
            .value
        )
      )
      .attr("r", d => {
        let found = d.indicator_id.find(indic => {
          return indic.key === "population";
        });
        return rScale(found.value);
      })
      .style("fill", d => color(d.region))
      .style("opacity", 0.65)
      .style("stroke", "white");

    d3.select(this.svgEl)
      .attr("transform", "translate(40, 20)")
      .call(d3.axisLeft(y));

    // d3.select(this.svgEl)
    //   .attr("transform", "translate(0, this.props.height)")
    //   .call(d3.axisBottom(x));
  }

  render() {
    let points = this.state.data.map(d => (
      <circle cx="0.5" cy="0.5" style={{ fill: "white" }} />
    ));
    const w = this.props.width + this.props.marginLeft + this.props.marginRight;
    const h =
      this.props.height + this.props.marginTop + this.props.marginBottom;

    return (
      <div className="BubbleChart">
        <svg
          preserveAspectRatio="xMidYMid meet"
          viewBox={`0 0 ${w} ${h}`}
          width={w}
          height={h}
          ref={element => (this.svgEl = element)}
        >
          {points}
        </svg>
      </div>
    );
  }
}

export default BubbleChart;
