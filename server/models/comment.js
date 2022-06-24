const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    text: {
      type: String,
      required: [true, "The Comment Text is required"],
    },
    cardId: {
      type: Schema.Types.ObjectId,
      required: [true, "The cardId is required"],
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
