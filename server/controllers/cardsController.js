const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");
const Card = require("../models/card");
const List = require("../models/list");

const getCard = (req, res, next) => {
  const id = req.params.id
  Card.findById(id)
  .then((card) => {
    res.json(card)
  })
}

const createCard = async (req, res, next) => {
  const listId = req.body.listId;
  const title = req.body.card.title;
  const list = await List.findById(listId);
  const boardId = list.boardId

  const card = await Card.create({ listId, title, boardId })
  if (!card.title) {
    return next(new HttpError("Unprocessable entity", 422));
  } else {
    req.card = card;
    next();
  }
};

const addCardToList = (req, res, next) => {
  const card = req.card;
  List.findByIdAndUpdate(req.body.listId, {
    $addToSet: { cards: card._id },
  }).then(() => {
    next();
  });
};

const sendCard = (req, res) => {
  const card = req.card;
  res.json({
    _id: card._id,
    title: card.title,
    boardId: card.boardId,
    listId: card.listId,
    createdAt: card.createdAt,
    updatedAt: card.updatedAt,
    position: card.position,
  });
};



exports.getCard = getCard;
exports.addCardToList = addCardToList;
exports.createCard = createCard;
exports.sendCard = sendCard;

