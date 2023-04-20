const { gql } = require("apollo-server");

const typeDefs = gql`

type User {
id: ID!
username: String!
email: String!

watchedMovies: [Watched]
watchlist: [Watchlist]
reviews: [Review]
following: [User] 
follower: [User]     
}

type Movie {
    id: ID!
    title: String!
    releaseYear: Int!
    director: String!
    actors: [String!]!
    runtime: Int!
    category: String!
    trailer: String!
    titleCard: String!
    synopsis: String!
  }

    type Watchlist {
        id: ID!
        user: User!
        movieId: ID!
      }


  type Watched {
    id: ID!
    user: User!
    movieId: ID!
  }

type Recommendation {
 id: ID!
 user: User!
 movie: Movie!
 watched: Watched!
 score: Int!
}

type Review {
    id: ID!
    text: String!
    rating: Int!
    user: User!
    watched: Watched!
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
    replies: [Reply]
  }

  type Reply {
    id: ID!
    text: String!
    user: User!
    comment: Comment!
    reaction: [Reaction]
  }

  type Query {
    movie(id: ID!): Movie
    user(id: ID!): User
    review(id: ID!): Review
    topRatedMovies(limit: Int! = 20): [Movie!]!
    recommendedMovies(watchedMovies: [ID!]!): [Recommendation!]!
    watched(id: ID!): Watched
    watchlist(id: ID!): Watchlist
    recommendation(id: ID!): Recommendation
    comment(id: ID!): Comment
    reaction(id: ID!): Reaction
    reply(id: ID!): Reply
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
  
`;


module.exports = typeDefs;
