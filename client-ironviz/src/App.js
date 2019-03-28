import React, { Component } from "react";
import "./App.scss";
import { Switch, Route } from "react-router-dom";

import HomePage from "./components/HomePage";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomePage} />
          {/* <Route exact path="/beers" component={Indicators} />
          <Route exact path="/beers/:id" component={Countries} />
          <Route exact path="/random-beer" component={MakeChart} />
          <Route exact path="/new-beer" component={Profile} /> */}
        </Switch>
      </div>
    );
  }
}

export default App;
