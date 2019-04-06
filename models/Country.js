const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const countrySchema = new Schema(
  {
    indicator_id: [{ type: Schema.Types.ObjectId, ref: "Indicator" }],
    name: String,
    iso3: String,
    landlocked: Boolean,
    flag: String,
    region: {
      type: String,
      enum: ["Asia", "Africa", "Americas", "Europe", "Oceania", "Antarctic"]
    },
    subregion: {
      type: String,
      enum: [
        "Antarctic",
        "Australia and New Zealand",
        "Caribbean",
        "Central America",
        "Central Asia",
        "Central Europe",
        "Eastern Africa",
        "Eastern Asia",
        "Eastern Europe",
        "Melanesia",
        "Micronesia",
        "Middle Africa",
        "North America",
        "Northern Africa",
        "Northern Europe",
        "Polynesia",
        "South America",
        "South-Eastern Asia",
        "Southern Africa",
        "Southern Asia",
        "Southern Europe",
        "Western Africa",
        "Western Asia",
        "Western Europe"
      ]
    },
    borders: [String]
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Country = mongoose.model("Country", countrySchema);
module.exports = Country;
