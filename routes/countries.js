const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Country = require("../models/Country");

//GET route => to get all Countries
router.get("/countries", (req, res, next) => {
  Country.find()
    .then(allCountries => {
      res.json(allCountries);
    })
    .catch(err => {
      res.json(err);
    });
  console.log("hello", res);
});

// GET route => to get a specific country
router.get("/countries/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Country.findById(req.params.id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
