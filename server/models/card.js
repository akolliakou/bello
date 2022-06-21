const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  title: {
    type: String,
    required: [true, 'The title is required']
  },
  description: String,
  labels: [
    {
      type: String
    }
  ],
  boardId: Schema.Types.ObjectId,
  listId: Schema.Types.ObjectId,
}, { timestamps: true });

const Card = mongoose.model('Card', CardSchema);

module.exports = Card;
