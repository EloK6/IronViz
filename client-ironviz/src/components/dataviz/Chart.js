import React from "react";
import * as d3 from "d3";
import axios from "axios";
import _ from "lodash";
import d3Tip from "d3-tip";

class Chart extends React.Component {
  static defaultProps = {
    width: 800,
    height: 600,
    forceStrength: 0.02,
    velocityDecay: 0.05
  };

  constructor(props) {
    super(props);
    this.nodes = [];
    this.state = {
      nodes: []
    };

    this.init();
  }

  init() {
    const { width, height, forceStrength, velocityDecay } = this.props;
    // d3-force simulation
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

  getData = () => {
    axios.get(`http://localhost:5000/api/countries`).then(responseFromApi => {
      const nodes = this.createNodes(responseFromApi.data);

      this.setState({ nodes: _.cloneDeep(nodes) }, () => {
        this.updateSimulation();
      });
      //this.init();
    });
  };

  updateSimulation = () => {
    this.nodes = _.cloneDeep(this.state.nodes);
    this.simulation.nodes(this.nodes);
    this.simulation.alpha(1).restart();
  };

  componentDidMount() {
    this.getData();
  }

  //Function Node
  createNodes = rawData => {
    //radius
    let maxRadius = d3.max(
      rawData.map(d =>
        d.indicator_id.find(indic => indic.key === "population")
      ),
      d => d.value
    );
    let radiusScale = d3
      .scaleLinear()
      .domain([1, maxRadius])
      .range([5, 120]);

    //color
    let color = d3
      .scaleOrdinal()
      .domain([rawData.map(d => d.region)])
      .range(["#FF8370", "#AA66E8", "#7DDAFF", "#68E866", "#FFE36B"]);

    // Use map() to convert raw data into node data.
    const myNodes = rawData.map(d => ({
      id: d._id,
      radius: radiusScale(
        d.indicator_id.find(indic => indic.key === "population").value
      ),
      value: d.indicator_id.find(indic => indic.key === "population").value,
      name: d.name,
      region: d.region,
      x: Math.random() * this.props.width,
      y: Math.random() * this.props.height,
      fill: color(d.region)
    }));
    console.log("myNodes", myNodes);

    // sort them descending to prevent occlusion of smaller nodes.
    myNodes.sort((a, b) => b.value - a.value);

    return myNodes;
  };

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
        {/* <g transform={`translate(${node.x} ${node.y})`}>
        {this.state.nodes.map(node => (
          <circle
            key={node.name}
            r={node.radius}
            cx="0"
            cy="0"
            fill={node.fill}
            stroke="white"
          />
      </g>
        ))} */}
        {this.state.nodes.map(node => (
          <g
            className="Dataviz__content__text"
            transform={`translate(${node.x} ${node.y})`}
          >
            <circle
              key={node.name}
              r={node.radius}
              cx="0"
              cy="0"
              fill={node.fill}
              stroke="white"
            />
            <text>{node.name}</text>
          </g>
        ))}
      </svg>
    );
  }
}

export default Chart;
