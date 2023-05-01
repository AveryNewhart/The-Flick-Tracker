const { Schema, model } = require("mongoose")
const reviewSchema = require("./Review")

const movieSchema = new Schema({
    movieId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    releaseYear: {
        type: String,
    },
    director: {  //!AXE
        type: String,
    },
    actors: [ //!AXE
        {
            type: String,
            // required: true
        }
    ],
    runtime: {
        type: Number,
    },
    category: { //!AXE
        type: String,
    },
    trailer: { //!AXE
        type: String,
    },
    imageURL: {
        type: String,
    },
    overview: {
        type: String,
    },
    reviews: [
        {
          reviewText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
          },
          reviewAuthor: {
            type: String,
            required: true,
          },
          createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp),
          },
        },
      ],
    review: [reviewSchema],
      // review: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: "Review"
    //     }
    // ]
})

movieSchema.virtual('posts', { //! Referencing review in Query in resolvers
    ref: 'reviewPost',
    localField: '_id',
    foreignField: 'movie'
  });

module.exports = movieSchema