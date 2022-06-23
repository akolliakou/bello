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
  .catch((err) => {
    console.log("Here");
    next(new HttpError("Board doesn't exist", 404))
  }
  );
}

exports.getBoards = getBoards;
exports.createBoard = createBoard;
exports.getBoard = getBoard;
