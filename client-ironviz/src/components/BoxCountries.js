import React, { Component } from "react";

class BoxCountries extends Component {
  render() {
    const { country, iso3 } = this.props;
    return (
      <div className="BoxCountries">
        <ul>
          <div className="BoxCountries__card">
            <li>
              <img
                src="https://www.countryflags.io/be/shiny/64.png"
                alt="city"
                className="BoxCountries__image"
              />
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
