import React, { Component } from "react";

class Button extends Component {
  onBtnClick = event => {
    this.props.onChanged(event.target.name);
  };
  render() {
    // const { active } = this.props;
    return (
      // <div className="Button">
      <div className="Button__dataviz">
        <button
          className="Button__dataviz__all btn btn-dark"
          name="all"
          onClick={this.onBtnClick}
        >
          All
        </button>
        <button
          className="Button__dataviz__region btn btn-dark"
          name="region"
          onClick={this.onBtnClick}
        >
          Region
        </button>
        <button
          className="Button__dataviz__region btn btn-dark"
          name="landlocked"
          onClick={this.onBtnClick}
        >
          Landlocked
        </button>
        <button
          className="Button__dataviz__region btn btn-dark"
          name="subregion"
          onClick={this.onBtnClick}
        >
          SubRegion
        </button>
      </div>
      // </div>
    );
  }
}

export default Button;
