import React, { Component } from "react";

class BoxCountries extends Component {
  render() {
    const { flag, country, iso3 } = this.props;
    return (
      <div className="BoxCountries">
        <ul>
          <div className="BoxCountries__card">
            <li>
              <div className="BoxCountries__card__flag">{flag}</div>
              <p>{iso3}</p>
              <h5>{country}</h5>
            </li>
          </div>
        </ul>
      </div>
    );
  }
}

export default BoxCountries;
