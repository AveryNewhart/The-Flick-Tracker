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

const Reaction = model("reaction", reactionSchema)

module.exports = Reaction;
