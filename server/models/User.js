const { model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");
const movieSchema = require('./Movie')
const reviewSchema = require("./Review")

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
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  // watchedMovies: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     // unique: true,
  //     ref: "Movie",
  //   },
  // ]
  watchedMovies: [movieSchema],
  watchlist: [movieSchema],
  // watchlist: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     // unique: true,
  //     ref: "Movie",
  //   },
  // ],
  followers: [
    {
      type: Schema.Types.String,
      // unique: true,
      ref: "User",
    },
  ],
  followings: [
    {
      type: Schema.Types.String,
     //  unique: true,
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

UserSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

UserSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

//TODO We can add userSchema virtuals for anything we can count like watched, watchlist, follower, following, or how many reviews a user has made

const User = model("User", UserSchema);

module.exports = User;
