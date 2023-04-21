const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
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
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // hide the password field by default when querying for users
    },
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

const User = model("User", UserSchema)

module.exports = User;
