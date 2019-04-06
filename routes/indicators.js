const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Country = require("../models/Country");
const Indicator = require("../models/Indicator");

router.get("/indicators/:country_id", function(req, res, next) {
  Indicator.find({ country_id: req.params.country_id })
    .populate("country_id")
    .then(allIndicators => {
      res.json(allIndicators);
    })
    .catch(err => {
      res.json(err);
    });
});

//GET route => to get all indicators
router.get("/indicators", (req, res, next) => {
  Indicator.find()
    .populate("country_id")
    .then(allIndics => {
      res.json(allIndics);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
