import React, { Component } from "react";
import "./App.scss";
import { Switch, Route } from "react-router-dom";

import HomePage from "./components/HomePage";
import Countries from "./components/countries/Countries";
import CountriesDetail from "./components/countries/CountriesDetail";
import Indicators from "./components/indicators/Indicators";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/indicators" component={Indicators} />
          <Route exact path="/countries" component={Countries} />
          <Route exact path="/countries/:id" component={CountriesDetail} />
          {/* <Route exact path="/own-chart" component={MakeChart} />
          <Route exact path="/profile" component={Profile} /> */}
        </Switch>
      </div>
    );
  }
}

export default App;
