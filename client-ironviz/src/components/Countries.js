import React, { Component } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
// import BoxCountries from "./BoxCountries";
import allCountries from "./countries.json";

class Countries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allCountriesArray: allCountries
    };
  }

  render() {
    return (
      <div className="Countries">
        <NavBar />
        <div className="Countries__content">
          {this.state.allCountriesArray.map(eachCountry => {
            return (
              <ul>
                <div className="BoxCountries__card">
                  <li>
                    <div className="BoxCountries__card__flag">
                      {eachCountry.flag}
                    </div>
                    <p>{eachCountry.cca3}</p>
                    <h5>{eachCountry.name.common}</h5>
                  </li>
                </div>
              </ul>
            );
          })}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Countries;
