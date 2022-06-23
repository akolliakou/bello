const Board = require("../models/board");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");
const List = require("../models/list");

const createList = (req, res, next) => {
  const boardId = req.body.boardId;
  const title = req.body.list.title;

  List.create({ boardId, title }).then((list) => {
    if (!list.title) {
      return next(new HttpError("Unprocessable entity", 422));
    } else {
      req.list = list;
      next();
    }
  });
};

const addListToBoard = (req, res, next) => {
  const list = req.list;
  Board.findByIdAndUpdate(req.body.boardId, {
    $addToSet: { lists: list._id },
  }).then(() => {
    next();
  });
};

const sendList = (req, res) => {
  const list = req.list;
  res.json({
    _id: list._id,
    title: list.title,
    boardId: list.boardId,
    createdAt: list.createdAt,
    updatedAt: list.updatedAt,
    position: list.position,
  });
};

const updateList = (req, res) => {
  const id = req.params.id;
  List.findByIdAndUpdate(id, req.body).then((list) => {
    res.json(list);
  });
}

exports.createList = createList;
exports.addListToBoard = addListToBoard;
exports.sendList = sendList;
exports.updateList = updateList;
