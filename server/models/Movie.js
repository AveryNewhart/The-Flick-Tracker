const { Schema, model } = require("mongoose")

const MovieSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    releaseYear: {
        type: Number,
    },
    director: {
        type: String,
    },
    actors: [
        {
            type: String,
            required: true
        }
    ],
    runtime: {
        type: Number,
    },
    category: {
        type: String,
    },
    trailer: {
        type: String,
    },
    imageURL: {
        type: String,
    },
    synopsis: {
        type: String,
    },
    review: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
})

const Movie = model("Movie", MovieSchema)

module.exports = Movie