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
                      <div
                        className="BoxHover__fill"
                        style={{ width: value1 + "%" }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Happy planet</td>
                    <td div className="BoxHover__background">
                      <div
                        className="BoxHover__fill"
                        style={{ width: value2 * 2 + "%" }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Human development</td>
                    <td div className="BoxHover__background">
                      <div
                        className="BoxHover__fill"
                        style={{ width: value3 * 100 + "%" }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>World happiness</td>
                    <td div className="BoxHover__background">
                      <div
                        className="BoxHover__fill"
                        style={{ width: value4 * 10 + "%" }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Sustainable dev</td>
                    <td div className="BoxHover__background">
                      <div
                        className="BoxHover__fill"
                        style={{ width: value5 + "%" }}
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
