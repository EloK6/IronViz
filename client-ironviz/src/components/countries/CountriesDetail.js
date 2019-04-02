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
    // axios
    //   .get(`http://localhost:5000/api/countries/${params.id}`)
    axios
      .all([
        axios.get(`http://localhost:5000/api/countries/${params.id}`),
        axios.get(`http://localhost:5000/api/indicators/${params.id}`)
      ])
      .then(
        axios.spread((countryResp, indicResp) => {
          console.log("indic", indicResp);
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
      gpdCapita
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
                {/* <tr>
                  <td>Hello</td>
                  <td div className="CountriesDetail__background">
                    <div
                      className="CountriesDetail__fill"
                      style={{ width: "12%" }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Gini</td>
                  <td div className="CountriesDetail__background">
                    <div
                      className="CountriesDetail__fill"
                      style={{ width: "50%" }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Happy planet</td>
                  <td div className="CountriesDetail__background">
                    <div
                      className="CountriesDetail__fill"
                      style={{ width: "70%" }}
                    />
                  </td>
                </tr>
              </table>
              <table className="CountriesDetail__card__table">
                <tr>
                  <td>Gini</td>
                  <td div className="CountriesDetail__background">
                    <div
                      className="CountriesDetail__fill"
                      style={{ width: "50%" }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Happy planet</td>
                  <td div className="CountriesDetail__background">
                    <div
                      className="CountriesDetail__fill"
                      style={{ width: "70%" }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Human development</td>
                  <td div className="CountriesDetail__background">
                    <div
                      className="CountriesDetail__fill"
                      style={{ width: "20%" }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>World happiness report score</td>
                  <td div className="CountriesDetail__background">
                    <div
                      className="CountriesDetail__fill"
                      style={{ width: "80%" }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Sustainable dev</td>
                  <td div className="CountriesDetail__background">
                    <div
                      className="CountriesDetail__fill"
                      style={{ width: "12%" }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Sustainable economic development assessment</td>
                  <td div className="CountriesDetail__background">
                    <div
                      className="CountriesDetail__fill"
                      style={{ width: "12%" }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>GPD per Capita</td>
                  <td div className="CountriesDetail__background">
                    <div
                      className="CountriesDetail__fill"
                      style={{ width: "12%" }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Gini</td>
                  <td div className="CountriesDetail__background">
                    <div
                      className="CountriesDetail__fill"
                      style={{ width: "50%" }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Happy planet</td>
                  <td div className="CountriesDetail__background">
                    <div
                      className="CountriesDetail__fill"
                      style={{ width: "70%" }}
                    />
                  </td>
                </tr> */}
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CountriesDetail;