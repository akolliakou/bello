const Board = require("../models/board");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

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
    find({_id: id}).
    populate({
      path: 'lists',
      match: { boardId: id }
    }).
    then((board) => {
    res.json(board);
  })
  .catch((err) =>
    next(new HttpError("Board doesn't exist", 404))
  );
}

exports.getBoards = getBoards;
exports.createBoard = createBoard;
exports.getBoard = getBoard;

// var postSchema = mongoose.Schema({
//   _comments: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
//   type: String,
//   body: String,
// });

// var commentSchema = mongoose.Schema({
//   id_post: mongoose.Schema.Types.ObjectId,
//   body: String,
// });

// Post.find({}).populate({
//   path: '_comments',
//   select: 'body',
//   match: { post_id: Post._id }
//   options: { limit: 5 }
// })
// .exec(function (err, posts){...});



// Story.
//   find().
//   populate({
//     path: 'fans',
//     match: { age: { $gte: 21 } },
//     // Explicitly exclude `_id`, see http://bit.ly/2aEfTdB
//     select: 'name -_id'
//   }).
//   exec();

// const author = new Person({
//   _id: new mongoose.Types.ObjectId(),
//   name: "Ian Fleming",
//   age: 50,
// });

// Story.findOne({ title: "Casino Royale" })
//   .populate("author")
//   .exec(function (err, story) {
//     if (err) return handleError(err);
//     console.log("The author is %s", story.author.name);
//     // prints "The author is Ian Fleming"
//   });