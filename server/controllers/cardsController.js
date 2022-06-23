const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");
const Card = require("../models/card");

const getCard = (req, res, next) => {
  const id = req.params.id
  Card.findById(id)
  .then((card) => {
    res.json(card)
  })
}

exports.getCard = getCard

