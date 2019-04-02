const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Country = require("../models/Country");
const Indicator = require("../models/Indicator");

router.get("/indicators/:countryId", function(req, res, next) {
  console.log("params", req.params);
  Indicator.find({ country_id: req.params.countryId })
    .populate("Country")
    .then(allIndicators => {
      res.json(allIndicators);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
