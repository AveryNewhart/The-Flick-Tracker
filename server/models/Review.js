const { model, Schema } = require("mongoose");
const User = require("./User");

const reviewSchema = new Schema({
  movie: {
    type: Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  reactions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Reaction",
    },
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

reviewSchema.pre("save", async function (next) {
  const user = await User.findById(this.user);
  if (!user.watched.includes(this.title)) {
    throw new Error(
      "You cannot review a movie that is not in your watched movies list."
    );
  }
  next();
});

// const Review = model("Review", reviewSchema);

module.exports = reviewSchema;