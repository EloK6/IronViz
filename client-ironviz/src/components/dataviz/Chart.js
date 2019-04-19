import React from "react";
import * as d3 from "d3";
import axios from "axios";
import _ from "lodash";

class Chart extends React.Component {
  static defaultProps = {
    width: 960,
    height: 600,
    forceStrength: 0.05,
    velocityDecay: 0.05
  };

  constructor(props) {
    super(props);

    this.nodes = [];
    this.state = {
      nodes: [],
      tooltip: {
        text: "",
        x: 0,
        y: 0
      }
    };

    this.mouse = {
      x: undefined,
      y: undefined
    };

    this.byRegion = false;

    //
    // d3 init
    //

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
            if (this.byRegion && this.centers && this.regions) {
              return this.centers[this.regions.indexOf(d.region)].x;
            } else {
              return width / 2;
            }
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
      .range([5, 100]);

    //color
    let color = d3
      .scaleOrdinal()
      .domain([rawData.map(d => d.region)])
      .range(["#FF8370", "#AA66E8", "#7DDAFF", "#68E866", "#FFE36B"]);

    //region
    // let regions = ["Asia", "Africa", "Europe", "Americas", "Oceania"];
    let regions = [...new Set(rawData.map(d => d.region))];
    this.regions = regions;

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
    // sort them descending to prevent occlusion of smaller nodes.
    myNodes.sort((a, b) => b.value - a.value);

    //centers
    // if (this.props.onChange && this.props.onChange.target.name === "region") {
    let centers = regions.map((region, index) => {
      return {
        x: (index + 1) * (this.props.width / (regions.length + 1)),
        y: this.props.height / 2,
        region: region
      };
    });
    this.centers = centers;

    return myNodes;
  };

  componentDidMount() {
    window.addEventListener("mousemove", this.mouseMoveHandler);
    this.rafid = requestAnimationFrame(this.rafstep);

    axios.get(`http://localhost:5000/api/countries`).then(responseFromApi => {
      const nodes = this.createNodes(responseFromApi.data);
      this.setState({ nodes: _.cloneDeep(nodes) }, () => {
        this.updateSimulation();
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.onChange !== this.props.onChange) {
      console.log("onChange changed to", this.props.onChange);
      if (this.props.onChange === "region") {
        this.byRegion = true;
      } else {
        this.byRegion = false;
      }
      console.log("byRegion", this.byRegion);
      this.updateSimulation();
    }
  }

  ticked = () => {
    // https://stackoverflow.com/a/46865234/133327
    this.setState({ nodes: _.cloneDeep(this.nodes) });
  };

  updateSimulation = () => {
    this.nodes = _.cloneDeep(this.state.nodes);
    this.simulation.nodes(this.nodes);
    this.simulation.alpha(1).restart();
  };

  rafstep = () => {
    this.setState(
      {
        tooltip: { ...this.state.tooltip, x: this.mouse.x, y: this.mouse.y }
      },
      () => {
        this.rafid = requestAnimationFrame(this.rafstep); // loop
      }
    );
  };

  mouseMoveHandler = ev => {
    this.mouse.x = ev.pageX;
    this.mouse.y = ev.pageY;
    // console.log("mouse", this.mouse.x, this.mouse.y);
  };
  mouseEnterHandler = node => {
    this.setState({ tooltip: { ...this.state.tooltip, text: node.name } });
  };
  mouseLeaveHandler = node => {
    this.setState({ tooltip: { ...this.state.tooltip, text: "" } });
  };

  componentWillUnmount() {
    window.removeEventListener("mousemove", this.mousemoveHandler);
    cancelAnimationFrame(this.rafid);
  }

  render() {
    const { width, height } = this.props;

    return (
      <>
        <div className="Chart">
          <svg
            className="Dataviz__svg"
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMidYMid meet"
          >
            {this.state.nodes.map(node => (
              <circle
                key={node.name}
                r={node.radius}
                cx={node.x}
                cy={node.y}
                fill={node.fill}
                stroke="white"
                opacity="0.85"
                onMouseEnter={ev => this.mouseEnterHandler(node)}
                onMouseLeave={ev => this.mouseLeaveHandler(node)}
              />
            ))}
          </svg>
          <div
            className="toolText"
            style={{
              left: `${this.state.tooltip.x}px`,
              top: `${this.state.tooltip.y}px`
            }}
          >
            {this.state.tooltip.text}
          </div>
        </div>
      </>
    );
  }
}

export default Chart;
