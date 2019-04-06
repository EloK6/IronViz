import React, { Component } from "react";
import * as d3 from "d3";
// import data from "../governments.json";
import axios from "axios";

class BubbleChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };

    this.updateStyleAndAttrs = this.updateChart.bind(this);
  }

  getData = () => {
    axios.get(`http://localhost:5000/api/countries`).then(responseFromApi => {
      this.setState(
        {
          data: responseFromApi.data
        },
        () => this.props.statePass(this.state.data)
      );
    });
  };

  // handleClick() {
  //   this.setState({
  //     data: getData()
  //   });
  // }

  componentDidMount() {
    this.updateChart();
    this.getData();
  }

  componentDidUpdate() {
    this.updateChart();
  }

  updateChart() {
    // let maxRadius = 20;

    //xScale
    let xMax = d3.max(
      this.state.data.map(d =>
        d.indicator_id.find(
          indic => indic.key === "overall economic freedom score"
        )
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

    //dataviz
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
      .attr("cx", d =>
        xScale(
          d.indicator_id.find(
            indic => indic.key === "overall economic freedom score"
          ).value
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
      .style("fill", d => color(d.region));

    dataviz.exit().remove();
  }

  render() {
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
        />
      </div>
    );
  }
}

export default BubbleChart;
