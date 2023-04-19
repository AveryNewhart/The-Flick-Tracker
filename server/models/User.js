const { model, Schema } = require("mongoose");

const userSchema = newSchema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: [
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      "Must match an email address",
    ],
  },
  watchedMovies: [
    {
      type: Schema.Types.ObjectId,
      ref: "Movie",
    },
  ],
  watchlist: [
    {
      type: Schema.Types.ObjectId,
      ref: "Movie",
    },
  ],
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

module.exports = User;
