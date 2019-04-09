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
    const xAxisValue = this.props.xAxisValue;
    const yAxisValue = this.props.yAxisValue;
    const rAxisValue = this.props.rAxisValue;

    //Inner margins of the chart
    const innerMargin = { top: 20, bottom: 40, left: 20, right: 20 };
    const innerWidth = this.props.width - innerMargin.left - innerMargin.right;
    const innerHeight =
      this.props.height - innerMargin.top - innerMargin.bottom;

    //xScale
    let xMax = d3.max(
      this.state.data.map(d =>
        d.indicator_id.find(indic => indic.key === xAxisValue)
      ),
      d => d.value
    );

    let xScale = d3
      .scaleLinear()
      .domain([0, xMax])
      .range([innerMargin.left, innerMargin.left + innerWidth]);

    //yScale
    let yMax = d3.max(
      this.state.data.map(d =>
        d.indicator_id.find(indic => indic.key === yAxisValue)
      ),
      d => d.value
    );

    let yScale = d3
      .scaleLinear()
      .domain([0, yMax])
      .range([innerMargin.top + innerHeight, innerMargin.top]);

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
  }

  render() {
    let points = this.state.data.map(d => (
      <circle cx="0.5" cy="0.5" style={{ fill: "white" }} />
    ));

    return (
      <div className="BubbleChart">
        <svg
          preserveAspectRatio="xMidYMid meet"
          viewBox={`0 0 ${this.props.width} ${this.props.height}`}
          width={this.props.width}
          height={this.props.height}
          ref={element => (this.svgEl = element)}
        >
          {points}
        </svg>
      </div>
    );
  }
}

export default BubbleChart;

// class BubbleChart extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: []
//     };
//   }

//   getData = () => {
//     axios.get(`http://localhost:5000/api/countries`).then(responseFromApi => {
//       this.setState({
//         data: responseFromApi.data
//       });
//     });
//   };

//   componentDidMount() {
//     // this.updateChart();
//     this.getData();
//   }

//   // componentDidUpdate() {
//   //   this.updateChart();
//   // }

//   chartComponents() {
//     const { width, height } = this.props;

//     const points = this.state.data.map(d => {
//       return {
//         x: d.indicator_id.find(
//           indic => indic.key === "women MPs (% of all MPs)"
//         ).value,
//         y: d.indicator_id.find(indic => indic.key === "GDP per capita (PPP)")
//           .value,
//         r: d.indicator_id.find(indic => indic.key === "population").value,
//         color: d.region,
//         datum: d
//       };
//     });

//     //Inner margins of the chart
//     const innerMargin = { top: 20, bottom: 20, left: 20, right: 20 };
//     const innerWidth = width - innerMargin.left - innerMargin.right;
//     const innerHeight = height - innerMargin.top - innerMargin.bottom;

//     //xScale
//     let xMax = d3.max(points, d => d.x);

//     let x = d3
//       .scaleLinear()
//       .domain([0, xMax])
//       .range([innerMargin.left, innerMargin.left + innerWidth]);

//     //yScale
//     let yMax = d3.max(points, d => d.y);

//     let y = d3
//       .scaleLinear()
//       .domain([0, yMax])
//       .range([innerMargin.top + innerHeight, innerMargin.top]);

//     //Radius
//     let maxRadius = d3.max(points, d => d.r);
//     let r = d3
//       .scaleLinear()
//       .domain([1, maxRadius])
//       .range([5, 60]);

//     //Color
//     let color = d3
//       .scaleOrdinal()
//       .domain([points, d => d.r])
//       .range(["#FF8370", "#AA66E8", "#7DDAFF", "#68E866", "#FFE36B"]);

//     return {
//       points,
//       width,
//       height,
//       innerMargin,
//       x,
//       y,
//       r,
//       color
//     };
//   }

//   handleHighlight(d) {
//     this.setState({ hightlight: d });
//   }

//   renderHighlight(chartCompo) {
//     const { highlight } = this.state;
//     const { innerMargin, height, x, y, r, color } = chartCompo;

//     // no highlight, so don't show anything
//     if (!highlight) {
//       return null;
//     }

//     // show a circle around the point and the text details of the point
//     return (
//       <g className="highlight">
//         <circle
//           cx={x(highlight.x)}
//           cy={y(highlight.y)}
//           r={r(highlight.r) + 4}
//           fill={color(highlight.color)}
//           strokeWidth={2}
//           stroke={d3.rgb(color(highlight.color)).darker()}
//         />
//       </g>
//     );
//   }

//   render() {
//     const chartCompo = this.chartComponents();
//     const { points, width, height, x, y, r, color } = chartCompo;

//     return (
//       <svg width={width} height={height} className="chart">
//         <g className="points">
//           {points.map((d, i) => {
//             return (
//               <circle
//                 key={i}
//                 cx={x(d.x)}
//                 cy={y(d.y)}
//                 r={r(d.r)}
//                 fill={color(d.color)}
//                 fill-opacity="0.7"
//                 stroke="white"
//                 onMouseEnter={this.handleHighlight.bind(this, d)}
//                 onMouseLeave={this.handleHighlight.bind(this, null)}
//               />
//             );
//           })}
//         </g>
//         {this.renderHighlight(chartCompo)}
//       </svg>
//     );
//   }
// }

// export default BubbleChart;
