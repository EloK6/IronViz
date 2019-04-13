import React, { Component } from "react";

class SelectAxis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueX: "",
      valueY: "",
      valueR: ""
    };
  }

  handleChangeX = event => {
    this.setState({ valueX: event.target.value });
    this.props.handleDataX(event.target.value);
    // console.log("Hello", event.target.value);
  };

  handleChangeY = event => {
    this.setState({ valueY: event.target.value });
    this.props.handleDataY(event.target.value);
  };

  handleChangeR = event => {
    this.setState({ valueR: event.target.value });
    this.props.handleDataR(event.target.value);
  };

  render() {
    return (
      <div className="SelectAxis">
        <form>
          <div className="form-group col-md-12">
            <label>
              <strong>Select the x Axis:</strong>
            </label>
            <select
              className="form-control form-control-sm"
              id="selectAbscisse"
              onChange={this.handleChangeX}
              name="valueX"
            >
              <option value="happy planet index" selected>
                happy planet index
              </option>
              <option value="human development index">
                human development index
              </option>
              <option value="world happiness report score">
                world happiness report score
              </option>
              <option value="sustainable economic development assessment (SEDA)">
                sustainable economic development assessment
              </option>
              <option value="women MPs (% of all MPs)">
                women MPs (% of all MPs)
              </option>
            </select>
            <div className="SelectAxis__explanation">
              <p>
                The <strong>Happy Planet Index (HPI)</strong> measures what
                matters: sustainable wellbeing for all. It tells us how well
                nations are doing at achieving long, happy, sustainable lives.{" "}
                <br />
                HPI = (Wellbeing x Life expectancy x Inequality of outcomes) /
                Ecological Footprint <br />
                Index: from 0 to 100
              </p>
            </div>
          </div>
          <div className="form-group col-md-12">
            <label>
              <strong>Select the y Axis:</strong>
            </label>
            <select
              className="form-control form-control-sm"
              id="selectOrdonnee"
              onChange={this.handleChangeY}
              name="valueY"
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
            <div className="SelectAxis__explanation">
              <p>
                The <strong>Happy Planet Index (HPI)</strong> measures what
                matters: sustainable wellbeing for all. It tells us how well
                nations are doing at achieving long, happy, sustainable lives.{" "}
                <br />
                HPI = (Wellbeing x Life expectancy x Inequality of outcomes) /
                Ecological Footprint <br />
                Index: from 0 to 100
              </p>
            </div>
          </div>
          <div className="form-group col-md-12">
            <label>
              <strong>Select the size:</strong>
            </label>
            <select
              className="form-control form-control-sm"
              id="selectRadius"
              onChange={this.handleChangeR}
              name="valueR"
            >
              <option value="population" selected>
                population
              </option>
              <option value="surface area (Km2)">surface area (Km2)</option>
              <option value="GDP (billions PPP)">GDP (billions PPP)</option>
            </select>
            <div className="SelectAxis__explanation">
              <p>
                The <strong>Happy Planet Index (HPI)</strong> measures what
                matters: sustainable wellbeing for all. It tells us how well
                nations are doing at achieving long, happy, sustainable lives.{" "}
                <br />
                HPI = (Wellbeing x Life expectancy x Inequality of outcomes) /
                Ecological Footprint <br />
                Index: from 0 to 100 The{" "}
              </p>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SelectAxis;
