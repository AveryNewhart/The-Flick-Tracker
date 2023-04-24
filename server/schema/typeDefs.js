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
    following: [User]
    follower: [User]
  }
  input CreateUserInput {
    email: String!
    username: String!
    password: String!
  }
  input UpdateUserInput {  ##This is how you comment in string interpolation
    email: String!
    username: String!
    password: String!
  }
  type Movie {
    id: ID!
    title: String!
    releaseYear: Int
    director: String
    actors: [String]
    runtime: Int
    category: String
    trailer: String
    imageURL: String
    synopsis: String
  }
  type Recommendation {
    id: ID!
    user: User!
    movie: Movie!
    score: Int!
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
    replies: [Reply]
  }
  type Reply {
    id: ID!
    text: String!
    user: User!
    comment: Comment!
    reaction: [Reaction]
  }
  type Auth {
    token: ID!
    user: User
  }
  type Query {
    user(username: String!): User ##Changed from ID to username to query user
    users: [User]
    review(id: ID!): Review
    reviews: [Review!]!
    comment(id: ID!): Comment
    comments: [Comment!]!
    reaction(id: ID!): Reaction
    reactions: [Reaction!]!
    reply(id: ID!): Reply
    replies: [Reply!]!
    protected: User
    movie(id: ID!): Movie
    topRatedMovies(limit: Int! = 20): [Movie!]!
    recommendedMovies(watchedMovies: [ID!]!): [Recommendation!]!
    recommendation(id: ID!): Recommendation
  }
  query GetUserInfo($userId: ID!) {
    user(id: $userId) {
      id
      username
      email
      watchedMovies {
        id
        movie {
          id
          title
          releaseYear
          director
          actors
          runtime
          category
          trailer
          titleCard
          synopsis
        }
      }
      watchlist {
        id
        movie {
          id
          title
          releaseYear
          director
          actors
          runtime
          category
          trailer
          titleCard
          synopsis
        }
      }
      reviews {
        id
        text
        rating
        watched {
          id
          movie {
            id
            title
          }
        }
        reactions {
          id
          emoji
        }
        comments {
          id
          text
          user {
            id
            username
          }
          replies {
            id
            text
            user {
              id
              username
            }
            reaction {
              id
              emoji
            }
          }
        }
      }
      following {
        id
        username
      }
      follower {
        id
        username
      }
    }
  }
  type Mutation {
    createUser(input: CreateUserInput!): Auth
    loginUser(email: String!, password: String!): Auth
    updateUser(id: ID!, input: UpdateUserInput!): User!
    addReview(userId: ID!, movieId: ID!, text: String!, rating: Int!): Review!
    updateReview(reviewId: ID!, text: String!, rating: Int!): Review!
    deleteReview(reviewId: ID!): Review!
    addReaction(reviewId: ID!, type: ReactionType!): Reaction!
    deleteReaction(reactionId: ID!): Reaction!
    addComment(reviewId: ID!, text: String!): Comment!
    updateComment(commentId: ID!, text: String!): Comment!
    deleteComment(commentId: ID!): Comment!
    addReply(commentId: ID!, text: String!): Reply!
    updateReply(replyId: ID!, text: String!): Reply!
    deleteReply(replyId: ID!): Reply!
  }
`;

module.exports = typeDefs;
//!Type Recommendation is for ChatGPT resolvers
//!Type Movie is for the IMDB API



// deleteUser(id: ID!): Boolean!

// recommendedMovies(watchedMovies: [ID!]!): [Recommendation!]!

// addWatchedMovie(userId: ID!, movieId: ID!): Watched!
// removeWatchedMovie(userId: ID!, movieId: ID!): Watched!

// addMovieToWatchlist(userId: ID!, movieId: ID!): Watchlist!
// removeMovieFromWatchlist(userId: ID!, movieId: ID!): Watchlist!