const { gql } = require("apollo-server");

const typeDefs = gql`

type User {
id: ID!
username: String!
email: String!

watchedMovies[Movie]
watchlist: [Movie]
reviews: [Review]
following: [User] 
follower: [User]     
}

type Movie {
id: ID!
title: String!
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
    emoji: String!
    user: User!
  }
  
  type Comment {
    id: ID!
    text: String!
    user: User!
    replies: [Comment]
  }

`;

// Get a specific user by ID
query GetUser {
  user(id: "1") {
    id
    username
    email
    watchedMovies {
      id
      title
    }
    watchlist {
      id
      title
    }
    reviews {
      id
      text
      rating
      user {
        id
        username
        email
      }
      reactions {
        id
        emoji
        user {
          id
          username
          email
        }
      }
      comments {
        id
        text
        user {
          id
          username
          email
        }
        replies {
          id
          text
          user {
            id
            username
            email
          }
        }
      }
    }
    following {
      id
      username
      email
    }
    followers {
      id
      username
      email
    }
  }
}

// Get all movies
query GetAllMovies {
  movies {
    id
    title
  }
}

// Get a specific movie by ID
query GetMovie {
  movie(id: "1") {
    id
    title
  }
}

// Get all reviews
query GetAllReviews {
  reviews {
    id
    text
    rating
    user {
      id
      username
      email
    }
    reactions {
      id
      emoji
      user {
        id
        username
        email
      }
    }
    comments {
      id
      text
      user {
        id
        username
        email
      }
      replies {
        id
        text
        user {
          id
          username
          email
        }
      }
    }
  }
}

module.exports = typeDefs;
