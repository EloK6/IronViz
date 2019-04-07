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

    //Tooltip div that is hidden by default:
    let tooltip = d3
      .select("dataviz")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "black")
      .style("border-radius", "5px")
      .style("padding", "10px")
      .style("color", "white");

    //functions to show / update (when mouse move but stay on same circle) / hide the tooltip
    // let showTooltip = d => {
    //   tooltip.transition().duration(200);
    //   tooltip
    //     .style("opacity", 1)
    //     .html("Country: " + d.name)
    //     .style("left", d3.mouse(this)[0] + 30 + "px")
    //     .style("top", d3.mouse(this)[1] + 30 + "px");
    // };
    // var moveTooltip = d => {
    //   tooltip
    //     .style("left", d3.mouse(this)[0] + 30 + "px")
    //     .style("top", d3.mouse(this)[1] + 30 + "px");
    // };
    // var hideTooltip = d => {
    //   tooltip
    //     .transition()
    //     .duration(200)
    //     .style("opacity", 0);
    // };

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
    let dataviz = d3
      .select(this.svgEl)
      .selectAll("circle")
      .data(this.state.data);

    dataviz
      .enter()
      .append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 0.1)
      .style("fill", "#fff")
      .merge(dataviz)
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
    // .on("mouseover", showTooltip)
    // .on("mousemove", moveTooltip)
    // .on("mouseleave", hideTooltip);

    dataviz.exit().remove();

    // d3.select(this.svgEl)
    //   .attr("transform", "translate(40, 20)")
    //   .call(d3.axisLeft(y));
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
