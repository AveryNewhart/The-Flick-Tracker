import { gql } from '@apollo/client';

// export const LOGIN_USER = gql`
//   mutation login($email: String!, $password: String!) {
//     login(email: $email, password: $password) {
//       token
//       user {
//         _id
//         username
//       }
//     }
//   }
// `;

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        id
        email
        password
      }
    }
  }
`;
 
export const CREATE_USER = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      user {
        id
        username
        email
      }
      token
    }
  }
`;

export const ADD_REVIEW = gql`
  mutation addReview($reviewText: String!) {
    addReview(reviewText: $reviewText) {
      _id
      user
      text
      movie
      rating
      createdAt
      comments {
        _id
        user
        text
      }
      reactions {
        _id
        commentText
      }
    }
  }
`;
 
export const ADD_COMMENT = gql`
  mutation addComment($reviewId: ID!, $commentText: String!) {
    addComment(reviewId: $thoughtId, commentText: $commentText) {
      _id
      reviewText
      reviewAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

export const SAVE_WATCHED_MOVIE = gql`
  mutation addWatchedMovie($input: MovieInput!) {
   addWatchedMovie(input: $input) {
    id
    watchedMovies {
      id
      movieId
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
  }
}`

export const SAVE_WATCH_LATER_MOVIE = gql`
  mutation addWatchLaterMovie($input: MovieInput!) {
   addWatchLaterMovie(input: $input) {
    id
    watchLaterMovies {
      id
      movieId
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
  }
}`
