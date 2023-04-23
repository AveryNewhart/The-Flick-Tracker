const { Schema, Types } = require("mongoose")

const watchlistSchema = new Schema({
  watchListId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId()
  },
  title: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
});

module.exports = watchlistSchema