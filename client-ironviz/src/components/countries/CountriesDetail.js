import React, { Component } from "react";

class CountriesDetail extends Component {
  render() {
    const {
      giniValue,
      happyPlanetValue,
      humanDevValue,
      WordlHappyValue,
      SustainableValue
    } = this.props;
    return (
      <div className="CountriesDetail">
        <ul>
          <div className="BoxCountries__card">
            <li>
              <table className="BoxHover__table">
                <tr>
                  <td>Gini</td>
                  <td div className="BoxHover__background">
                    <div
                      className="BoxHover__fill"
                      style={{ width: giniValue + "%" }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Happy planet</td>
                  <td div className="BoxHover__background">
                    <div
                      className="BoxHover__fill"
                      style={{ width: happyPlanetValue * 2 + "%" }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Human development</td>
                  <td div className="BoxHover__background">
                    <div
                      className="BoxHover__fill"
                      style={{ width: humanDevValue * 100 + "%" }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>World happiness</td>
                  <td div className="BoxHover__background">
                    <div
                      className="BoxHover__fill"
                      style={{ width: WordlHappyValue * 10 + "%" }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Sustainable dev</td>
                  <td div className="BoxHover__background">
                    <div
                      className="BoxHover__fill"
                      style={{ width: SustainableValue + "%" }}
                    />
                  </td>
                </tr>
              </table>
            </li>
          </div>
        </ul>
      </div>
    );
  }
}

export default CountriesDetail;
