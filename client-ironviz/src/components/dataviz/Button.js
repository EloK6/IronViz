import React, { Component } from "react";

class Button extends Component {
  onBtnClick = event => {
    this.props.onChanged(event.target.name);
  };
  render() {
    const { active } = this.props;
    return (
      <div className="Button__dataviz">
        <button
          className={`Button__form ${active === "all" && "active"}`}
          name="all"
          onClick={this.onBtnClick}
        >
          All
        </button>
        <button
          className={`Button__form ${active === "region" && "active"}`}
          name="region"
          onClick={this.onBtnClick}
        >
          Region
        </button>
      </div>
    );
  }
}

export default Button;
