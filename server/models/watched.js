//?Will we need to associate IMDB_Movie ID as the _id generated for the watched and watchlist movies, or just match movie title in link?

const mongoose = require("mongoose");

const watchedMovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  review: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Watched = model("Watched", watchedMovieSchema)

module.exports = Watched;
