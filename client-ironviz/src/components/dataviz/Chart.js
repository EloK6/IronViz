import React, { Component } from "react";
import * as d3 from "d3";
// import axios from "axios";

class Chart extends Component {
  constructor(props) {
    super(props);
    const { forceStrength, center } = props;
    this.simulation = d3
      .forceSimulation()
      .velocityDecay(0.2)
      .force(
        "x",
        d3
          .forceX()
          .strength(forceStrength)
          .x(center.x)
      )
      .force(
        "y",
        d3
          .forceX()
          .strength(forceStrength)
          .y(center.y)
      )
      .force("charge", d3.forceManyBody().strength(this.charge.bind(this)))
      .on("tick", this.ticked.bind(this))
      .stop();
  }

  state = {
    g: null
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.renderBubbles(nextProps.data);
    }
    if (nextProps.groupByYear !== this.props.groupByYear) {
      this.regroupBubbles(nextProps.groupByYear);
    }
  }

  shouldComponentUpdate() {
    //make React ignore this component
    return false;
  }

  onRef = ref => {
    this.setState({ g: d3.select(ref) }, () =>
      this.renderBubbles(this.props.data)
    );
  };

  ticked() {
    this.state.g.selectAll('.bubble')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
  }

  charge(d) {
    return -this.props.forceStrength * (d.radius ** 2.0)
  }

  regroupBubbles = (groupByYear) => {
    const { forceStrength, yearCenters, center } = this.props
    if (groupByYear) {
      this.simulation.force('x', d3.forceX().strength(forceStrength).x(d => yearCenters[d.year].x))
                      .force('y', d3.forceY().strength(forceStrength).y(d => yearCenters[d.year].y))
    } else {
      this.simulation.force('x', d3.forceX().strength(forceStrength).x(center.x))
                      .force('y', d3.forceY().strength(forceStrength).y(center.y))
    }
    this.simulation.alpha(1).restart()
    renderBubbles(data) {
      const bubbles = this.state.g.selectAll('.bubble').data(data, d => d.id)
  
      // Exit
      bubbles.exit().remove()
  
      // Enter
      const bubblesE = bubbles.enter().append('circle')
        .classed('bubble', true)
        .attr('r', 0)
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('fill', d => fillColor(d.group))
        .attr('stroke', d => d3.rgb(fillColor(d.group)).darker())
        .attr('stroke-width', 2)
        .on('mouseover', showDetail)  // eslint-disable-line
        .on('mouseout', hideDetail) // eslint-disable-line
  
      bubblesE.transition().duration(2000).attr('r', d => d.radius).on('end', () => {
        this.simulation.nodes(data)
        .alpha(1)
        .restart()
      })
    }
  }
    render() {
      return (
        <g ref={this.onRef} className="bubbles" />
      )
    }
}

export default Chart;
