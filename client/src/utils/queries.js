import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query user($username: String!) {
  user(username: $username) {
    id
    username
    email
    watchlist {
      movieId
      title
      releaseYear
      imageURL
      overview
    }
    watchedMovies {
      movieId
      title
      releaseYear
      imageURL
      overview
    }
    reviews {
      id
      text
      rating
      user {
        id
        username
      }
      reactions {
        id
        type
        user {
          id
          username
        }
      }
      comments {
        id
        text
        user {
          id
          username
        }
        reactions {
          id
          type
          user {
            id
            username
          }
        }
        replies {
          id
          text
          user {
            id
            username
          }
        }
      }
    }
  }
}
`;

export const QUERY_REVIEWS = gql`
  query getReviews {
    reviews {
      _id
      reviewText
      reviewAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_REVIEW = gql`
  query getSingleReview($reviewId: ID!) {
    review(reviewId: $reviewId) {
      _id
      reviewText
      reviewAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_PROTECTED = gql`
query protected {
  protected {
    id
    username
    email
    followers {
      id
      username
    }
    followings {
      id
      username
    }
    reviews {
      id
      user {
        id
        username
      }
    }
    watchedMovies {
      movieId
      title
      releaseYear
      imageURL
      overview
    }
    watchlist {
      movieId
      title
      releaseYear
      imageURL
      overview
    }
  }
}
`;


