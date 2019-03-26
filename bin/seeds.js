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

// Country.create(base_countries, err => {
//   if (err) {
//     throw err;
//   }
//   console.log(`Created ${base_countries.length} countries`);

//   mongoose.connection.close();
// });

Promise.all(
  base_countries.map(async country => {
    const countryDoc = await Country.create({
      name: country.name,
      iso3: country.iso3,
      landlocked: country.landlocked,
      flag: country.flag,
      region: country.region,
      subregion: country.subregion,
      borders: country.borders
    });

    for (key in country.indicators) {
      await Indicator.create({
        country_id: countryDoc._id,
        key: key,
        value:
          country.indicators[key] !== "-"
            ? parseFloat(country.indicators[key])
            : 0
      });
    }
  })
).then(() => mongoose.connection.close());
