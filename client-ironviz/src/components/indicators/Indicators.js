import React, { Component } from "react";
import BubbleChart from "./BubbleChart";
import NavBar from "../NavBar";
import Footer from "../Footer";

class Indicators extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueX: "happy planet index",
      valueY: "GDP per capita (PPP)",
      valueR: "population"
    };
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  processStatePass = state => {
    console.log("statePassed");
    console.log(state);
  };
  render() {
    return (
      <div className="Indicators">
        <NavBar />
        <div className="Indicators__dataviz">
          <form>
            <div className="row">
              <div className="form-group col-md-4">
                <label for="selectAbscisse">
                  <strong>Select the x Axis</strong>
                </label>
                <select
                  className="form-control"
                  id="selectAbscisse"
                  value={this.state.valueX}
                  onChange={this.handleChange}
                >
                  <option value="happy planet index" selected>
                    happy planet index
                  </option>
                  <option value="human development index">
                    human development index
                  </option>
                  <option value="world happiness report score<">
                    world happiness report score
                  </option>
                  <option value="sustainable economic development assessment (SEDA)">
                    sustainable economic development assessment
                  </option>
                  <option value="women MPs (% of all MPs)">
                    women MPs (% of all MPs)
                  </option>
                </select>
              </div>
              <div className="form-group col-md-4">
                <label for="selectOrdonnee">
                  <strong>Select the y Axis</strong>
                </label>
                <select
                  className="form-control"
                  id="selectOrdonnee"
                  value={this.state.valueY}
                  onChange={this.handleChange}
                >
                  <option value="GDP per capita (PPP)" selected>
                    GDP per capita
                  </option>
                  <option value="judicial effectiveness score">
                    judicial effectiveness score
                  </option>
                  <option value="government integrity score">
                    government integrity score
                  </option>
                  <option value="property rights score">
                    property rights score
                  </option>
                  <option value="tax burden score">tax burden score</option>
                  <option value="overall economic freedom score">
                    overall economic freedom score
                  </option>
                  <option value="financial freedom score">
                    financial freedom score
                  </option>
                </select>
              </div>
              <div className="form-group col-md-4">
                <label for="selectRadius">
                  <strong>Select the size</strong>
                </label>
                <select
                  className="form-control"
                  id="selectRadius"
                  value={this.state.valueR}
                  onChange={this.handleChange}
                >
                  <option value="population" selected>
                    population
                  </option>
                  <option value="surface area (Km2)">surface area (Km2)</option>
                  <option value="GDP ">GDP</option>
                </select>
              </div>
            </div>
          </form>

          <BubbleChart
            width={800}
            height={600}
            marginLeft={30}
            marginRight={30}
            marginTop={30}
            marginBottom={30}
            statePass={this.processStatePass}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Indicators;
