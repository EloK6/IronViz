import React, { Component } from "react";
import "./App.scss";
import { Switch, Route } from "react-router-dom";

import HomePage from "./components/HomePage";
import Countries from "./components/countries/Countries";
import CountriesDetail from "./components/countries/CountriesDetail";
import Indicators from "./components/create-indicators/Indicators";
import Dataviz from "./components/dataviz/Dataviz";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/indicators" component={Dataviz} />
          <Route exact path="/countries" component={Countries} />
          <Route exact path="/countries/:id" component={CountriesDetail} />
          <Route exact path="/own-chart" component={Indicators} />
          {/* <Route exact path="/profile" component={Profile} /> */}
        </Switch>
      </div>
    );
  }
}

export default App;
