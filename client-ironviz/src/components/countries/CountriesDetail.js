import React, { Component } from "react";
import NavBar from "../NavBar";
import Footer from "../Footer";
import axios from "axios";
import { Link } from "react-router-dom";

class CountriesDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getOneCountry = () => {
    const { params } = this.props.match;
    axios
      .get(`http://localhost:5000/api/countries/${params.id}`)
      .then(responseFromApi => {
        const theProject = responseFromApi.data;
        this.setState(theProject);
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getOneCountry();
  }

  render() {
    return (
      <div className="CountriesDetail">
        <div className="CountriesDetail__content">
          <table className="CountriesDetail__table">
            <tr>
              <td>Gini</td>
              <td div className="CountriesDetail__background">
                <div
                  className="CountriesDetail__fill"
                  style={{ width: "50%" }}
                />
              </td>
            </tr>
            <tr>
              <td>Happy planet</td>
              <td div className="CountriesDetail__background">
                <div
                  className="CountriesDetail__fill"
                  style={{ width: "70%" }}
                />
              </td>
            </tr>
            <tr>
              <td>Human development</td>
              <td div className="CountriesDetail__background">
                <div
                  className="CountriesDetail__fill"
                  style={{ width: "20%" }}
                />
              </td>
            </tr>
            <tr>
              <td>World happiness report score</td>
              <td div className="CountriesDetail__background">
                <div
                  className="CountriesDetail__fill"
                  style={{ width: "80%" }}
                />
              </td>
            </tr>
            <tr>
              <td>Sustainable dev</td>
              <td div className="CountriesDetail__background">
                <div
                  className="CountriesDetail__fill"
                  style={{ width: "12%" }}
                />
              </td>
            </tr>
            <tr>
              <td>Sustainable economic development assessment</td>
              <td div className="CountriesDetail__background">
                <div
                  className="CountriesDetail__fill"
                  style={{ width: "12%" }}
                />
              </td>
            </tr>
            <tr>
              <td>GPD per Capita</td>
              <td div className="CountriesDetail__background">
                <div
                  className="CountriesDetail__fill"
                  style={{ width: "12%" }}
                />
              </td>
            </tr>
          </table>
        </div>
      </div>
    );
  }
}

export default CountriesDetail;
