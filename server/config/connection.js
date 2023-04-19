const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/flicktracker" //! We may need to change this connection string in the future
);

module.exports = mongoose.connection;
