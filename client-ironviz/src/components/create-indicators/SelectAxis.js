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
    function text1(valueX) {
      let explanation;

      // eslint-disable-next-line default-case
      switch (valueX) {
        case "happy planet index":
          return (
            <div>
              The <strong>Happy Planet Index (HPI)</strong> measures what
              matters: sustainable wellbeing for all. It tells us how well
              nations are doing at achieving long, happy, sustainable lives.{" "}
              <br />
              HPI = (Wellbeing x Life expectancy x Inequality of outcomes) /
              Ecological Footprint <br />
              Index: from 0 to 100
            </div>
          );
          break;

        case "human development index":
          return (
            <div>
              The <strong>Human Development Index (HDI)</strong> is a statistic
              composite index of life expectancy, education, and per capita
              income indicators, which are used to rank countries into four
              tiers of human development.
              <br />
              Index : from 0 to 1.
            </div>
          );
          break;

        case "world happiness report score":
          return (
            <div>
              The <strong>World Happiness Report Score</strong> is a ranking of
              national happiness based on respondent ratings of their own lives,
              which the report also correlates with various life factors.
              <br />
              Index : 0 to 10
            </div>
          );
          break;

        case "sustainable economic development assessment (SEDA)":
          return (
            <div>
              The{" "}
              <strong>
                Sustainable Economic Development Assessment (SEDA)
              </strong>
              is a diagnostic tool that gives countries insight into their
              overall social and economic conditions.
              <br />
              Index : 0 to 100
            </div>
          );
          break;

        case "women MPs (% of all MPs)":
          return (
            <div>
              The <strong>Women in parliaments</strong>
              are the percentage of parliamentary seats in a single or lower
              chamber held by women.
              <br />
              Index : 0 to 100
            </div>
          );
          break;
      }

      return explanation;
    }

    function text2(valueY) {
      let explanation;

      // eslint-disable-next-line default-case
      switch (valueY) {
        case "GDP per capita (PPP)":
          return (
            <div>
              <strong>GDP per capita</strong> is calculated by dividing GDP by
              midyear population. GDP is the total market value of all final
              goods and services produced in a country in a given year.
            </div>
          );
          break;

        case "judicial effectiveness score":
          return (
            <div>
              <strong>Judicial Effectiveness Index</strong> is a groundbreaking
              tool for monitoring and evaluating judicial performance.
            </div>
          );
          break;

        case "government integrity score":
          return (
            <div>
              Corruption erodes economic freedom by introducing insecurity and
              uncertainty into economic relationships. The CPI is based on a
              10-point scale in which a score of 10 indicates very little
              corruption and a score of 0 indicates a very corrupt government.
              In scoring freedom from corruption, the Index converts the raw CPI
              data to a scale of 0 to 100 by multiplying the CPI score by 10.
              For example, if a country’s raw CPI data score is 5.5, its overall
              freedom from corruption score is 55.
            </div>
          );
          break;

        case "property rights score":
          return (
            <div>
              The property rights component is an assessment of the ability of
              individuals to accumulate private property, secured by clear laws
              that are fully enforced by the state. It measures the degree to
              which a country’s laws protect private property rights and the
              degree to which its government enforces those laws. It also
              assesses the likelihood that private property will be expropriated
              and analyzes the independence of the judiciary, the existence of
              corruption within the judiciary, and the ability of individuals
              and businesses to enforce contracts. The more certain the legal
              protection of property, the higher a country’s score.
            </div>
          );
          break;

        case "tax burden score":
          return (
            <div>
              Tax Burden is a measure of the tax burden imposed by government.
              It includes direct taxes, in terms of the top marginal tax rates
              on individual and corporate incomes, and overall taxes, including
              all forms of direct and indirect taxation at all levels of
              government, as a percentage of GDP.
            </div>
          );
          break;

        case "overall economic freedom score":
          return (
            <div>
              An index of economic freedom is a method of scoring and ranking
              jurisdictions based on the degree of economic freedom – judged by
              factors such as rule of law, property rights, tax and regulation –
              their residents enjoy.
            </div>
          );
          break;

        case "financial freedom score":
          return (
            <div>
              Financial freedom is a measure of banking efficiency as well as a
              measure of independence from government control and interference
              in the financial sector. State ownership of banks and other
              financial institutions such as insurers and capital markets
              reduces competition and generally lowers the level of available
              services.
            </div>
          );
          break;
      }

      return explanation;
    }

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
              {text1(this.state.valueX)}
            </div>
          </div>
          <hr />
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
              {text2(this.state.valueY)}
            </div>
          </div>
          <hr />
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
          </div>
        </form>
      </div>
    );
  }
}

export default SelectAxis;
