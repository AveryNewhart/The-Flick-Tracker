const { model, Schema } = require("mongoose");

const reactionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: ["THUMBS_UP", "THUMBS_DOWN", "LOVE", "LAUGH", "SAD", "ANGRY"],
    required: true,
  },
});

const Reaction = model("Reaction", reactionSchema);

module.exports = Reaction;
