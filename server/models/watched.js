const mongoose = require('mongoose');
//TODO COMPLETE
const watchedMovieSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie'
  }
});

module.exports = Watched