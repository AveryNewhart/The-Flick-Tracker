const mongoose = require('mongoose');
require('dotenv').config();
// let uri = "mongodb+srv://avery:password12345@the-flick-tracker.dnbkejv.mongodb.net/?retryWrites=true&w=majority"

// const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/the-flick-tracker',
  {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFindAndModify: false

  // useCreateIndex: true,
}
);

module.exports = mongoose.connection;



// const mongoose = require("mongoose");

// mongoose.connect(
//   process.env.MONGODB_URI || "mongodb+srv://avery:password12345@the-flick-tracker.dnbkejv.mongodb.net/?retryWrites=true&w=majority" //! We may need to change this connection string in the future
// );

// module.exports = mongoose.connection;


//  mongodb+srv://avery:<password>@the-flick-tracker.dnbkejv.mongodb.net/?retryWrites=true&w=majority
// "mongodb://127.0.0.1:27017/flicktracker" //! We may need to change this connection string in the future