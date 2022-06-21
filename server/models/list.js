const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "The List title is required"],
    },
    position: {
      type: Schema.Types.Decimal128,
    },
    boardId: {
      type: Schema.Types.ObjectId,
      required: [true, "The boardId is required"],
    },
  },
  { timestamps: true }
);

const List = mongoose.model('List', ListSchema);

module.exports = List;