const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Country = require("../models/Country");
const Indicator = require("../models/Indicator");

router.get("/indicators/:country_id", (req, res, next) => {
  Indicator.findById(req.params.country_id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.json(err);
    });
});

// router.get("/indicators", (req, res, next) => {
//   Indicator.find()
//     .then(response => {
//       res.status(200).json(response);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

module.exports = router;
