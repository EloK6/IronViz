import React, { Component } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

class HomePage extends Component {
  render() {
    return (
      <div className="HomePage">
        <NavBar />
        <div>
          <img
            className="HomePage__image-cover-home"
            src={require("../assets/home.jpg")}
            alt="countries"
          />
        </div>
        <div className="HomePage__text">
          <h1>IronViz</h1>
          <p>
            Hae duae provinciae bello quondam piratico catervis mixtae praedonum
            a Servilio pro consule missae sub iugum factae sunt vectigales. et
            hae quidem regiones velut in prominenti terrarum lingua positae ob
            orbe eoo monte Amano disparantur. Superatis Tauri montis verticibus
            qui ad solis ortum sublimius attolluntur, Cilicia spatiis porrigitur
            late distentis dives bonis omnibus terra, eiusque lateri dextro
            adnexa Isauria, pari sorte uberi palmite viget et frugibus minutis,
            quam mediam navigabile flumen Calycadnus interscindit.
          </p>
        </div>
        <Footer />
      </div>
    );
  }
}

export default HomePage;
