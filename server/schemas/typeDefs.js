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
    id: ID!
    movieId: String!
    title: String!
    releaseYear: String
    director: String
    actors: [String]
    runtime: Int
    category: String
    trailer: String
    imageURL: String
    synopsis: String
  }
  input MovieInput {
    movieId: Int!
    title: String!
    releaseYear: String!
    runtime: Int
    imageURL: String!
    synopsis: String!
  }
  type Review {
    id: ID!
    text: String!
    rating: Int!
    user: User!
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

    ## review(id: ID!): Review
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
    addFollower(userId: ID!, followedUserId: ID!): User!
    unfollow(userId: ID!, followedUserId: ID!): User!
    ## updateUser(id: ID!, input: UpdateUserInput!): User!
    loginUser(email: String!, password: String!): Auth
    addWatchedMovie(input: MovieInput!): User!
    addMovieToWatchlist(input: MovieInput): User!
  }
`;

module.exports = typeDefs;

// recommendedMovies(watchedMovies: [ID!]!): [Recommendation!]!

// removeWatchedMovie(userId: ID!, movieId: ID!): Watched!

// removeMovieFromWatchlist(userId: ID!, movieId: ID!): Watchlist!

// ##  addReview(userId: ID!, movieId: ID!, text: String!, rating: Int!): Review!
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
