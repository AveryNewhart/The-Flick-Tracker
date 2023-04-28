import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query User($username: String!) {
  user(username: $username) {
    id
    username
    email
    watchlist {
      id
      title
      releaseYear
      director
      actors
      runtime
      category
      trailer
      imageURL
      synopsis
    }
    watchedMovies {
      id
      title
      releaseYear
      director
      actors
      runtime
      category
      trailer
      imageURL
      synopsis
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

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      reviews {
        _id
        reviewText
        reviewAuthor
        createdAt
      }
    }
  }
`;
