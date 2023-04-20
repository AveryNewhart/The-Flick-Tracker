mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
      },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
});

const Watchlist = model("Watchlist", watchlistSchema)

module.exports = Watchlist