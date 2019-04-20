import React from "react";
import * as d3 from "d3";
import axios from "axios";
import _ from "lodash";

class Chart extends React.Component {
  static defaultProps = {
    width: 960,
    height: 600,
    forceStrength: 0.07,
    velocityDecay: 0.05
  };

  constructor(props) {
    super(props);

    this.nodes = [];
    this.state = {
      indics: [],
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
    this.splitIndicator = null;
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
            if (this.byRegion && this.centers && this.indics) {
              // console.log(this.splitIndicator , d, d[this.splitIndicator ]);
              return this.centers[this.indics.indexOf(d[this.splitIndicator])]
                .x;
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
      .range([5, 80]);

    //color
    let color = d3
      .scaleOrdinal()
      .domain([rawData.map(d => d.region)])
      .range(["#FF8370", "#AA66E8", "#68E866", "#7DDAFF", "#FFE36B"]);

    //region
    let indics = [...new Set(rawData.map(d => d[this.splitIndicator]))];
    this.indics = indics;
    console.log("indics", indics);
    this.setState({ indics: indics });

    // Use map() to convert raw data into node data.
    const myNodes = rawData.map(d => ({
      id: d._id,
      radius: radiusScale(
        d.indicator_id.find(indic => indic.key === "population").value
      ),
      value: d.indicator_id.find(indic => indic.key === "population").value,
      name: d.name,
      region: d.region,
      subregion: d.subregion,
      landlocked: d.landlocked,
      x: Math.random() * this.props.width,
      y: Math.random() * this.props.height,
      fill: color(d.region)
    }));
    // sort them descending to prevent occlusion of smaller nodes.
    myNodes.sort((a, b) => b.value - a.value);

    //Define centers

    // eslint-disable-next-line no-undef
    // calculatePosition = (index, ObjEl) => {
    //   let centers = indics.map((ind, index) => {
    //     return {
    //       x: (index + 1) * (this.props.width / (indics.length + 1))
    //     };
    //   });
    //   return centers.objEl;
    // };

    let centers = indics.map((ind, index) => {
      return {
        x: (index + 1) * (this.props.width / (indics.length + 1)),
        y: this.props.height / 2,
        ind: ind
      };
    });
    this.centers = centers;

    //Titles
    // let titles = indics.map(ind => {
    //   return {
    //     ind: ind
    //   };
    // });
    // console.log("hello", titles);
    // this.titles = titles;

    return myNodes;
  };

  componentDidMount() {
    window.addEventListener("mousemove", this.mouseMoveHandler);
    this.rafid = requestAnimationFrame(this.rafstep);

    axios
      .get(`${process.env.REACT_APP_API_URL || ""}/api/countries`)
      .then(responseFromApi => {
        const nodes = this.createNodes(responseFromApi.data);
        this.setState(
          { nodes: _.cloneDeep(nodes), rawData: responseFromApi.data },
          () => {
            this.updateSimulation();
          }
        );
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.onChange !== this.props.onChange) {
      console.log("onChange changed to", this.props.onChange);
      if (this.props.onChange === "region") {
        this.byRegion = true;
        this.splitIndicator = "region";
      } else if (this.props.onChange === "landlocked") {
        this.byRegion = true;
        this.splitIndicator = "landlocked";
      } else if (this.props.onChange === "subregion") {
        this.byRegion = true;
        this.splitIndicator = "subregion";
      } else {
        this.byRegion = false;
        this.splitIndicator = null;
      }
      this.createNodes(this.state.rawData);

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
          {this.centers && (
            <div className="titles">
              {this.state.indics.map((indic, index) => (
                <p
                  style={{
                    position: "absolute",
                    left: `${(100 * (index + 1)) / (this.centers.length + 1)}%`,
                    top: `100px`,
                    transform: `translateX(-50%)`
                  }}
                >
                  {indic}
                </p>
              ))}
            </div>
          )}
        </div>
      </>
    );
  }
}

export default Chart;
