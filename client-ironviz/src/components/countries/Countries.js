import React, { Component } from "react";
import NavBar from "../NavBar";
import Footer from "../Footer";
import axios from "axios";
import BoxCountries from "./BoxCountries";
import { Link } from "react-router-dom";
// import BoxHover from "./BoxHover";

class Countries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfCountries: []
    };
  }

  getAllCountries = () => {
    axios.get(`http://localhost:5000/api/countries`).then(responseFromApi => {
      this.setState({
        listOfCountries: responseFromApi.data
      });
    });
  };

  componentDidMount() {
    this.getAllCountries();
  }

  render() {
    return (
      <div className="Countries">
        <NavBar />

        <div className="Countries__content">
          {this.state.listOfCountries.map(eachCountry => {
            return (
              <div key={eachCountry._id}>
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/countries/${eachCountry._id}`}
                >
                  <BoxCountries
                    flag={eachCountry.flag}
                    iso3={eachCountry.iso3}
                    country={eachCountry.name}
                  />
                </Link>
              </div>
            );
          })}
        </div>

        {/* <div className="Countries__content">
          {this.state.allGovArray.map(eachGov => {
            return (
              <BoxHover
                value1={eachGov["GINI index"]}
                value2={eachGov["happy planet index"]}
                value3={eachGov["human development index"]}
                value4={eachGov["world happiness report score"]}
                value5={
                  eachGov["sustainable economic development assessment (SEDA)"]
                }
              />
            );
          })}
        </div> */}
        <Footer />
      </div>
    );
  }
}

export default Countries;