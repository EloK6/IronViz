import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class CountriesDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getIndicatorValue = (indicators, key) => {
    return indicators.find(indic => indic.key === key).value;
  };

  getOneCountry = () => {
    const { params } = this.props.match;
    axios
      .all([
        axios.get(`${process.env.REACT_APP_API_URL}/countries/${params.id}`),
        axios.get(`${process.env.REACT_APP_API_URL}/indicators/${params.id}`)
      ])
      .then(
        axios.spread((countryResp, indicResp) => {
          this.setState({
            flag: countryResp.data.flag,
            name: countryResp.data.name,
            valueGini: this.getIndicatorValue(indicResp.data, "GINI index"),
            valueHappyP: this.getIndicatorValue(
              indicResp.data,
              "happy planet index"
            ),
            humanDev: this.getIndicatorValue(
              indicResp.data,
              "human development index"
            ),
            worldHappiness: this.getIndicatorValue(
              indicResp.data,
              "world happiness report score"
            ),
            sustainableDev: this.getIndicatorValue(
              indicResp.data,
              "sustainable economic development assessment (SEDA)"
            ),
            gpdCapita: this.getIndicatorValue(
              indicResp.data,
              "GDP per capita (PPP)"
            ),
            education: this.getIndicatorValue(
              indicResp.data,
              "education expenditure% of GDP"
            ),
            school: this.getIndicatorValue(
              indicResp.data,
              "school life expectancy (YEARS)"
            ),
            govSpending: this.getIndicatorValue(
              indicResp.data,
              "government expenditure (% of GDP)"
            ),
            judicial: this.getIndicatorValue(
              indicResp.data,
              "judicial effectiveness score"
            ),
            govIntegrity: this.getIndicatorValue(
              indicResp.data,
              "government integrity score"
            ),
            propertyRight: this.getIndicatorValue(
              indicResp.data,
              "property rights score"
            ),
            tax: this.getIndicatorValue(indicResp.data, "tax burden score"),
            economicFreedom: this.getIndicatorValue(
              indicResp.data,
              "overall economic freedom score"
            ),
            financialFreedom: this.getIndicatorValue(
              indicResp.data,
              "financial freedom score"
            ),
            women: this.getIndicatorValue(
              indicResp.data,
              "women MPs (% of all MPs)"
            )
          });
        })
      );
  };

  getColor = value => {
    let colorValue = "";
    if (value <= 19) {
      colorValue = "#a20643";
    } else if (value >= 20 && value <= 39) {
      colorValue = "#fa9d5a";
    } else if (value >= 40 && value <= 59) {
      colorValue = "#fcf6ae";
    } else if (value >= 60 && value <= 79) {
      colorValue = "#91d068";
    } else if (value >= 80 && value <= 100) {
      colorValue = "#016d3a";
    }
    return colorValue;
  };

  getGini = valueGini => {
    if (valueGini < 1) {
      valueGini = 100;
    } else {
    }
    return valueGini;
  };

  componentDidMount() {
    this.getOneCountry();
  }

  render() {
    const {
      flag,
      name,
      valueGini,
      valueHappyP,
      humanDev,
      worldHappiness,
      sustainableDev,
      gpdCapita,
      education,
      school,
      govSpending,
      judicial,
      govIntegrity,
      propertyRight,
      tax,
      economicFreedom,
      financialFreedom,
      women
    } = this.state;

    return (
      <div className="CountriesDetail">
        <div className="CountriesDetail__content">
          <div className="CountriesDetail__card">
            <div className="CountriesDetail__card__header">
              <div className="link__header">
                <Link to="/countries" className="nav-link">
                  <i className="fas fa-times" />
                </Link>
              </div>
              <div>
                <h3 className="name__header">{name}</h3>
              </div>
              <div>
                <h4 className="flag__header">{flag}</h4>
              </div>
            </div>
            <div className="CountriesDetail__card__table-global">
              <table className="CountriesDetail__card__table">
                <tr>
                  <td>Gini Index</td>
                  <td div className="CountriesDetail__background">
                    {valueGini < 1 ? (
                      <div
                        className="CountriesDetail__fill"
                        style={{
                          width: valueGini + "%",
                          backgroundColor: `${this.getColor(valueGini)}`
                        }}
                      />
                    ) : (
                      <div
                        className="CountriesDetail__fill"
                        style={{
                          width: 101 - valueGini + "%",
                          backgroundColor: `${this.getColor(101 - valueGini)}`
                        }}
                      />
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Happy planet</td>
                  <td div className="CountriesDetail__background">
                    <div
                      className="CountriesDetail__fill"
                      style={{
                        width: valueHappyP * 2 + "%",
                        backgroundColor: `${this.getColor(valueHappyP * 2)}`
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Human development</td>
                  <td div className="CountriesDetail__background">
                    <div
                      className="CountriesDetail__fill"
                      style={{
                        width: humanDev * 100 + "%",
                        backgroundColor: `${this.getColor(humanDev * 100)}`
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>World happiness report score</td>
                  <td div className="CountriesDetail__background">
                    <div
                      className="CountriesDetail__fill"
                      style={{
                        width: worldHappiness * 10 + "%",
                        backgroundColor: `${this.getColor(worldHappiness * 10)}`
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Sustainable dev</td>
                  <td div className="CountriesDetail__background">
                    <div
                      className="CountriesDetail__fill"
                      style={{
                        width: sustainableDev + "%",
                        backgroundColor: `${this.getColor(sustainableDev)}`
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>GPD per capita</td>
                  <td div className="CountriesDetail__background">
                    <div
                      className="CountriesDetail__fill"
                      style={{
                        width: gpdCapita * 0.00062295 + "%",
                        backgroundColor: `${this.getColor(
                          gpdCapita * 0.00062295
                        )}`
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Education</td>
                  <td div className="CountriesDetail__background">
                    <div
                      className="CountriesDetail__fill"
                      style={{
                        width: education * 10 + "%",
                        backgroundColor: `${this.getColor(education * 10)}`
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>School</td>
                  <td div className="CountriesDetail__background">
                    <div
                      className="CountriesDetail__fill"
                      style={{
                        width: school * 5 + "%",
                        backgroundColor: `${this.getColor(school * 5)}`
                      }}
                    />
                  </td>
                </tr>
              </table>
              <table className="CountriesDetail__card__table">
                <tr>
                  <td>Government spending score</td>
                  <td div className="CountriesDetail__background">
                    <div
                      className="CountriesDetail__fill"
                      style={{
                        width: govSpending + "%",
                        backgroundColor: `${this.getColor(govSpending)}`
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Judicial effectiveness score</td>
                  <td div className="CountriesDetail__background">
                    <div
                      className="CountriesDetail__fill"
                      style={{
                        width: judicial + "%",
                        backgroundColor: `${this.getColor(judicial)}`
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Government integrity score</td>
                  <td div className="CountriesDetail__background">
                    <div
                      className="CountriesDetail__fill"
                      style={{
                        width: govIntegrity + "%",
                        backgroundColor: `${this.getColor(govIntegrity)}`
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Property rights score</td>
                  <td div className="CountriesDetail__background">
                    <div
                      className="CountriesDetail__fill"
                      style={{
                        width: propertyRight + "%",
                        backgroundColor: `${this.getColor(propertyRight)}`
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Tax</td>
                  <td div className="CountriesDetail__background">
                    <div
                      className="CountriesDetail__fill"
                      style={{
                        width: 100 - tax + "%",
                        backgroundColor: `${this.getColor(100 - tax)}`
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Overall economic freedom score</td>
                  <td div className="CountriesDetail__background">
                    <div
                      className="CountriesDetail__fill"
                      style={{
                        width: economicFreedom + "%",
                        backgroundColor: `${this.getColor(economicFreedom)}`
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Financial freedom score</td>
                  <td div className="CountriesDetail__background">
                    <div
                      className="CountriesDetail__fill"
                      style={{
                        width: financialFreedom + "%",
                        backgroundColor: `${this.getColor(financialFreedom)}`
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Women MPs (% of all MPs)</td>
                  <td div className="CountriesDetail__background">
                    <div
                      className="CountriesDetail__fill"
                      style={{
                        width: women + "%",
                        backgroundColor: `${this.getColor(women)}`
                      }}
                    />
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CountriesDetail;
