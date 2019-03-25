const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const indicatorSchema = new Schema(
  {
    country_id: { type: Schema.Types.ObjectId, ref: "Country" },
    key: String,
    value: Number
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Indicator = mongoose.model("Indicator", indicatorSchema);
module.exports = Indicator;
