import React, { Component } from "react";
import NavBar from "../NavBar";
import Footer from "../Footer";
import axios from "axios";
import BoxCountries from "./BoxCountries";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

class Countries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: "",
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

  updateSearch = oneCountry => {
    this.setState({ searchString: oneCountry });
  };

  render() {
    return (
      <div className="Countries">
        <NavBar />

        <div className="Countries__content">
          <div className="Countries__content__Search">
            <SearchBar updateString={this.updateSearch} />
          </div>

          <div className="Countries__content__Countries">
            {this.state.listOfCountries
              .filter(country => {
                return country.name
                  .toLowerCase()
                  .includes(this.state.searchString.toLowerCase());
              })
              .map(eachCountry => {
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
                        value1={eachCountry["GINI index"]}
                        value2={eachCountry["happy planet index"]}
                        value3={eachCountry["human development index"]}
                        value4={eachCountry["world happiness report score"]}
                        value5={
                          eachCountry[
                            "sustainable economic development assessment (SEDA)"
                          ]
                        }
                      />
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default Countries;
