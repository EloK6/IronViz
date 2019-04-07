import React, { Component } from "react";
import * as d3 from "d3";
import axios from "axios";

class Chart extends Component {
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

    //simulation
    let simulation = d3
      .forceSimulation()
      .force("x", d3.forceX(this.props.width / 2).strength(0.05))
      .force("y", d3.forceX(this.props.height / 2).strength(0.05))
      .force(
        "collide",
        d3.forceCollide("r", d => {
          let found = d.indicator_id.find(indic => {
            return indic.key === "population";
          });
          return rScale(found.value);
        })
      );

    //dataviz
    let dataviz = d3
      .select(this.svgEl)
      .selectAll("circle")
      .data(this.state.data);

    dataviz
      .enter()
      .append("circle")
      // .attr("cx", 0)
      // .attr("cy", 0)
      // .attr("r", 0.1)
      // .style("fill", "#fff")
      // .merge(dataviz)
      // .transition()
      // .duration(2000)
      // .attr("cx", this.props.width / 2)
      // .attr("cy", this.props.height / 2)
      .attr("r", d => {
        let found = d.indicator_id.find(indic => {
          return indic.key === "population";
        });
        return rScale(found.value);
      })
      .style("fill", d => color(d.region))
      .style("opacity", 0.65)
      .style("stroke", "white");

    simulation.nodes(this.state.data).on("tick", ticked);

    function ticked() {
      dataviz.attr("cx", d => d.x).attr("cy", d => d.y);
    }

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

export default Chart;
