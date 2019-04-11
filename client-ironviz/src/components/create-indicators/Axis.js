import React, { Component } from "react";
import * as d3 from "d3";
// import axios from "axios";

class Axis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: []
    };
  }

  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis() {
    const { type } = this.props;

    d3.select(this.refs.g).call(d3[`axis${type}`](this.props.scale));
  }

  render() {
    const { x, y } = this.props;

    return <g transform={`translate(${x}, ${y})`} ref="g" />;
  }
}
export default Axis;

//   getData = () => {
//     axios.get(`http://localhost:5000/api/countries`).then(responseFromApi => {
//       this.setState({
//         data: responseFromApi.data
//       });
//     });
//   };

//   componentDidMount() {
//     this.renderAxis();
//     this.getData();
//   }
//   componentDidUpdate() {
//     this.renderAxis();
//   }

//   renderAxis() {
//     const xAxisValue = this.props.xAxisValue;
//     const innerMargin = { top: 20, bottom: 40, left: 20, right: 20 };
//     const innerWidth = this.props.width - innerMargin.left - innerMargin.right;

//     let xMax = d3.max(
//       this.state.data.map(d =>
//         d.indicator_id.find(indic => indic.key === xAxisValue)
//       ),
//       d => d.value
//     );

//     let xScale = d3
//       .scaleLinear()
//       .domain([0, xMax])
//       .range([innerMargin.left, innerMargin.left + innerWidth]);

//     const axis = d3.axisBottom(xScale);
//     d3.select(this.refs.g).call(axis);

//     // const scale = d3
//     //   .scaleLinear()
//     //   .domain([0, 100])
//     //   .range([0, 600]);
//     // const axis = d3.axisBottom(scale);

//     // d3.select(this.refs.g).call(axis);
//   }

//   render() {
//     return (
//       <g
//         transform="translate(innerMargin.left, innerMargin.left + innerWidth)"
//         ref="g"
//       />
//     );
//   }
// }
// export default Axis;
