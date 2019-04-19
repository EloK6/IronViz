import React, { Component } from "react";

class BoxCountries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHover: false
    };

    this.onMouseEnterHandler = this.onMouseEnterHandler.bind(this);
    this.onMouseLeaveHandler = this.onMouseLeaveHandler.bind(this);
  }

  onMouseEnterHandler() {
    this.setState({
      isHover: true
    });
  }

  onMouseLeaveHandler() {
    this.setState({
      isHover: false
    });
  }

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

  render() {
    const { isHover } = this.state;
    const {
      flag,
      country,
      iso3,
      value1,
      value2,
      value3,
      value4,
      value5
    } = this.props;
    return (
      <div
        onMouseEnter={this.onMouseEnterHandler}
        onMouseLeave={this.onMouseLeaveHandler}
      >
        {!isHover ? (
          <div className="BoxCountries">
            <ul className="BoxCountries__card">
              <li>
                <div className="BoxCountries__card__flag">{flag}</div>
                <p>{iso3}</p>
                <h5>{country}</h5>
              </li>
            </ul>
          </div>
        ) : (
          <div className={`BoxCountries ${isHover ? "isHover" : ""}`}>
            <ul className="BoxCountries__card">
              <li>
                <h5>
                  {flag} {country}
                </h5>
                <table className="BoxHover__table">
                  <tr>
                    <td>Gini</td>

                    <td div className="BoxHover__background">
                      {value1 < 1 ? (
                        <div
                          className="BoxHover__fill"
                          style={{
                            width: value1 + "%",
                            backgroundColor: `${this.getColor(value1)}`
                          }}
                        />
                      ) : (
                        <div
                          className="CountriesDetail__fill"
                          style={{
                            width: 101 - value1 + "%",
                            backgroundColor: `${this.getColor(101 - value1)}`
                          }}
                        />
                      )}
                    </td>

                    {/* <td div className="BoxHover__background">
                      <div
                        className="BoxHover__fill"
                        style={{
                          width: 101 - value1 + "%",
                          backgroundColor: `${this.getColor(101 - value1)}`
                        }}
                      />
                    </td> */}
                  </tr>
                  <tr>
                    <td>Happy planet</td>
                    <td div className="BoxHover__background">
                      <div
                        className="BoxHover__fill"
                        style={{
                          width: value2 * 2 + "%",
                          backgroundColor: `${this.getColor(value2 * 2)}`
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Human development</td>
                    <td div className="BoxHover__background">
                      <div
                        className="BoxHover__fill"
                        style={{
                          width: value3 * 100 + "%",
                          backgroundColor: `${this.getColor(value3 * 100)}`
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>World happiness</td>
                    <td div className="BoxHover__background">
                      <div
                        className="BoxHover__fill"
                        style={{
                          width: value4 * 10 + "%",
                          backgroundColor: `${this.getColor(value4 * 10)}`
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Sustainable dev</td>
                    <td div className="BoxHover__background">
                      <div
                        className="BoxHover__fill"
                        style={{
                          width: value5 + "%",
                          backgroundColor: `${this.getColor(value5)}`
                        }}
                      />
                    </td>
                  </tr>
                </table>
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default BoxCountries;
