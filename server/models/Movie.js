const { Schema, model } = require("mongoose")

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
    review: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
})

// const Movie = model("Movie", MovieSchema)

module.exports = movieSchema