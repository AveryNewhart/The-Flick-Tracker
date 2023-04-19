const { model, Schema } = require("mongoose");

const reactionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: ["thumbsUp", "thumbsDown"],
    required: true,
  },
});

module.exports = Reaction;
