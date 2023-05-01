const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    watchedMovies: [Movie]
    watchlist: [Movie]
    reviews: [Review]
    followings: [User]
    followers: [User]
  }
  input CreateUserInput {
    email: String!
    username: String!
    password: String!
  }
  input DeleteUserInput {
    id: ID!
    password: String!
  }
  type Movie {

    movieId: ID!
    title: String

    releaseYear: String
    imageURL: String
    overview: String
    reviews: [Review]
  }
  input MovieInput {

    movieId: ID!
    title: String

    releaseYear: String
    imageURL: String
    overview: String
  }
  type Review {
    id: ID!
    text: String!
    createdAt: String
    rating: Int!
    user: User!
    movie: Movie
    reviewText: String!
    reviewAuthor: String!
    reactions: [Reaction]
    comments: [Comment]
  }
  type Reaction {
    id: ID!
    type: ReactionType!
    user: User!
  }
  enum ReactionType {
    THUMBS_UP
    THUMBS_DOWN
    LIKE
    LOVE
    LAUGH
    SAD
    ANGRY
  }
  type Comment {
    id: ID!
    text: String!
    user: User!
    reactions: [Reaction]
    replies: [Reply]
  }
  type Reply {
    id: ID!
    text: String!
    user: User!
    comment: Comment!
    reactions: [Reaction]
  }
  type Auth {
    token: ID!
    user: User
  }
  type Query {
    user(username: String!): User ##Changed from ID to username to query user
    users: [User]

    review(id: ID!): [Review]
    ## reviews: [Review!]!
    ## comment(id: ID!): Comment
    ## comments: [Comment!]!
    ## reaction(id: ID!): Reaction
    ## reactions: [Reaction!]!
    ## reply(id: ID!): Reply
    ## replies: [Reply!]!
    protected: User
    movie(id: ID!): Movie
  }

  type Mutation {
    createUser(input: CreateUserInput!): Auth
    deleteUser(id: ID!, input: DeleteUserInput!): User
    addFollower(userId: String!, followedUserId: String): User!
    unfollow(userId: String!, followedUserId: String): User!
    ## updateUser(id: ID!, input: UpdateUserInput!): User!
    loginUser(email: String!, password: String!): Auth
    addWatchedMovie(movie: MovieInput!): User
    addMovieToWatchlist(movie: MovieInput): User!
    removeWatchedMovie(input: MovieInput): User
    removeMovieFromWatchlist(input: MovieInput): User
    addReview(movieId: String!, reviewText: String!, reviewAuthor: String! ): Review

  }
`;

module.exports = typeDefs;

// addReview(userId: ID!, movieId: ID!, text: String!, rating: Int!): Review!

// recommendedMovies(watchedMovies: [ID!]!): [Recommendation!]!

// removeWatchedMovie(movie: MovieInput): User

// removeMovieFromWatchlist(userId: ID!, movieId: ID!): Watchlist!

// ##  updateReview(reviewId: ID!, text: String!, rating: Int!): Review!
// ##  deleteReview(reviewId: ID!): Review!
// ##  addReaction(reviewId: ID!, type: ReactionType!): Reaction!
// ##  deleteReaction(reactionId: ID!): Reaction!
// ##  addComment(reviewId: ID!, text: String!): Comment!
// ## updateComment(commentId: ID!, text: String!): Comment!
// ## deleteComment(commentId: ID!): Comment!
// ##  addReply(commentId: ID!, text: String!): Reply!
// ## updateReply(replyId: ID!, text: String!): Reply!
// ## deleteReply(replyId: ID!): Reply!

//    User  createReview  CreateDatabase  Movie
//    User  