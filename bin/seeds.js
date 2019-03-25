const mongoose = require("mongoose");
const Country = require("../models/Country");
const Indicator = require("../models/Indicator");

const dbName = "ironviz";
mongoose.connect(`mongodb://localhost/${dbName}`);

const countries = require("./countries.json");
const governments = require("./governments.json");

const base_countries = governments.map(gov => {
  const country = countries.find(co => {
    return gov["ISO Country code"] === co.cca3;
  });

  const indicators = {};
  for (let indicatorKey in gov) {
    if (indicatorKey === "Country" || indicatorKey === "ISO Country code") {
      continue;
    }
    indicators[indicatorKey] = gov[indicatorKey];
  }

  return {
    name: gov["Country"],
    iso3: gov["ISO Country code"],
    landlocked: country.landlocked,
    flag: country.flag,
    region: country.region,
    subregion: country.subregion,
    borders: country.borders,
    indicators: indicators
  };
});

Country.create(base_countries, err => {
  if (err) {
    throw err;
  }
  console.log(`Created ${base_countries.length} countries`);
  mongoose.connection.close();
});
