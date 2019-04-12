import React, { Component } from "react";

class SearchBar extends Component {
  state = {
    search: ""
  };

  handleChange = event => {
    this.setState({ search: event.target.value });
    this.props.updateString(event.target.value);
  };

  render() {
    return (
      <div className="SearchBar">
        <form>
          <div className="form-group">
            <label className="searchbar">
              <strong>Search a country</strong>
            </label>
            <input
              type="text"
              className="form-control"
              id="searchbar"
              name="searchString"
              value={this.state.search}
              placeholder="Enter search here"
              onChange={event => this.handleChange(event)}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBar;
