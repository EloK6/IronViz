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
        axios.get(`http://localhost:5000/api/countries/${params.id}`),
        axios.get(`http://localhost:5000/api/indicators/${params.id}`)
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
            unemployment: this.getIndicatorValue(
              indicResp.data,
              "unemployment (%)"
            ),
            govSpending: this.getIndicatorValue(
              indicResp.data,
              "government spending score"
            ),
            polRights: this.getIndicatorValue(
              indicResp.data,
              "political rights score"
            ),
            civilLib: this.getIndicatorValue(
              indicResp.data,
              "civil liberties score"
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
      unemployment,
      govSpending,
      polRights,
      civilLib,
      judicial,
      govIntegrity,
      propertyRight,
      tax,
      economicFreedom,
      financialFreedom,
      women
    } = this.state;
    console.log(valueGini);
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
                  <td>Gini</td>
                  <td div className="CountriesDetail__background">
                    <div
                      className="CountriesDetail__fill"
                      style={{ width: valueGini + "%" }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Happy planet</td>
                  <td div className="CountriesDetail__background">
                    <div
                      className="CountriesDetail__fill"
                      style={{ width: valueHappyP + "%" }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Human development</td>
                  <td div className="CountriesDetail__background">
                    <div
                      className="CountriesDetail__fill"
                      style={{ width: humanDev + "%" }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>World happiness report score</td>
                  <td div className="CountriesDetail__background">
                    <div
                      className="CountriesDetail__fill"
                      style={{ width: worldHappiness + "%" }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Sustainable dev</td>
                  <td div className="CountriesDetail__background">
                    <div
                      className="CountriesDetail__fill"
                      style={{ width: sustainableDev + "%" }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>GPD per capita</td>
                  <td div className="CountriesDetail__background">
                    <div
                      className="CountriesDetail__fill"
                      style={{ width: (gpdCapita * 100) / 160526 + "%" }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Unemployment</td>
                  <td div className="CountriesDetail__background">
                    <div
                      className="CountriesDetail__fill"
                      style={{ width: unemployment + "%" }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Government spending score</td>
                  <td div className="CountriesDetail__background">
                    <div
                      className="CountriesDetail__fill"
                      style={{ width: govSpending + "%" }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Political rights score </td>
                  <td div className="CountriesDetail__background">
                    <div
                      className="CountriesDetail__fill"
                      style={{ width: polRights * (100 / 7) + "%" }}
                    />
                  </td>
                </tr>
              </table>
              <table className="CountriesDetail__card__table">
                <tr>
                  <td>Civil liberties</td>
                  <td div className="CountriesDetail__background">
                    <div
                      className="CountriesDetail__fill"
                      style={{ width: civilLib * (100 / 7) + "%" }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Judicial effectiveness score</td>
                  <td div className="CountriesDetail__background">
                    <div
                      className="CountriesDetail__fill"
                      style={{ width: judicial + "%" }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Government integrity score</td>
                  <td div className="CountriesDetail__background">
                    <div
                      className="CountriesDetail__fill"
                      style={{ width: govIntegrity + "%" }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Property rights score</td>
                  <td div className="CountriesDetail__background">
                    <div
                      className="CountriesDetail__fill"
                      style={{ width: propertyRight + "%" }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Tax burden score</td>
                  <td div className="CountriesDetail__background">
                    <div
                      className="CountriesDetail__fill"
                      style={{ width: tax + "%" }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Overall economic freedom score</td>
                  <td div className="CountriesDetail__background">
                    <div
                      className="CountriesDetail__fill"
                      style={{ width: economicFreedom + "%" }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Financial freedom score</td>
                  <td div className="CountriesDetail__background">
                    <div
                      className="CountriesDetail__fill"
                      style={{ width: financialFreedom + "%" }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Women MPs (% of all MPs)</td>
                  <td div className="CountriesDetail__background">
                    <div
                      className="CountriesDetail__fill"
                      style={{ width: women + "%" }}
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
