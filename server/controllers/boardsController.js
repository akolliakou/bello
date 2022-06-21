const Board = require("../models/board");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");
const List = require("../models/list");
const Card = require("../models/card");

const getBoards = (req, res, next) => {
  Board.find({}, "title _id createdAt updatedAt").then((boards) => {
    res.json(boards);
  });
};

const createBoard = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    Board.create(req.body.board)
      .then((board) => {
        res.json({
          title: board.title,
          _id: board._id,
          createdAt: board.createdAt,
          updatedAt: board.updatedAt,
        });
      })
      .catch((err) =>
        next(new HttpError("Creating board failed, please try again", 500))
      );
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

const getBoard = (req, res, next) => {
  const id = req.params.id;
  Board.
    findById(id).
    populate({
      path: 'lists',
      populate: { path: 'cards', model: 'Card' }
    }).
    then((board) => {
    res.json(board);
  })
  .catch((err) =>
    next(new HttpError("Board doesn't exist", 404))
  );
}

const createList = (req, res, next) => {
  const boardId = req.body.boardId;
  const title = req.body.list.title;

  List.create({boardId, title})
    .then(list => {
      if (!list.title) {
        return next(new HttpError("Unprocessable entity", 422));
      } else {
        req.list = list;
        next();
      }
    })
}

const addListToBoard = (req, res, next) => {
  const list = req.list;
  Board.findByIdAndUpdate(req.body.boardId, { $addToSet: { lists: list._id } }).then(() => {
    next();
  })
}

const sendList = (req, res) => {
  const list = req.list
  res.json({
    _id: req.list._id,
    title: req.list.title,
    boardId: req.list.boardId,
    createdAt: req.list.createdAt,
    updatedAt: req.list.updatedAt,
    position: req.list.position,
  });
}

exports.getBoards = getBoards;
exports.createBoard = createBoard;
exports.getBoard = getBoard;
exports.createList = createList;
exports.addListToBoard = addListToBoard;
exports.sendList = sendList;
