import React, { Component } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import BoxCountries from "./BoxCountries";
import allCountries from "./countries.json";
import allGovernments from "./governments.json";
import BoxHover from "./BoxHover";

class Countries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allCountriesArray: allCountries,
      allGovArray: allGovernments
    };
  }

  render() {
    return (
      <div className="Countries">
        <NavBar />
        {/* <div className="Countries__content">
          {this.state.allCountriesArray.map(eachCountry => {
            return (
              <BoxCountries
                flag={eachCountry.flag}
                iso3={eachCountry.cca3}
                country={eachCountry.name.common}
              />
            );
          })}
        </div> */}
        <div className="Countries__content">
          {this.state.allGovArray.map(eachGov => {
            return (
              <BoxHover
                value1={eachGov["GINI index"]}
                value2={eachGov["happy planet index"]}
                value3={eachGov["human development index"]}
                value4={eachGov["world happiness report score"]}
                value5={
                  eachGov["ustainable economic development assessment (SEDA)"]
                }
              />
            );
          })}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Countries;
