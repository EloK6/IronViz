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
    axios
      .get(`${process.env.REACT_APP_API_URL || ""}/api/countries`)
      .then(responseFromApi => {
        const countries = responseFromApi.data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        console.log("helo", responseFromApi.data);
        this.setState({
          listOfCountries: countries
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
                        value1={eachCountry.indicator_id[2].value}
                        value2={eachCountry.indicator_id[3].value}
                        value3={eachCountry.indicator_id[4].value}
                        value4={eachCountry.indicator_id[5].value}
                        value5={eachCountry.indicator_id[6].value}
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
