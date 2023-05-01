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
  mutation addWatchedMovie($movie: MovieInput!) {
   addWatchedMovie(movie: $movie) {
    id
    watchedMovies {
      movieId
      title
      releaseYear
      imageURL
      overview
    }
  }
}`

export const REMOVE_WATCHED_MOVIE = gql`
mutation removeWatchedMovie($input: MovieInput) {
  removeWatchedMovie(input: $input) {
    id
  }
}
`;

export const SAVE_WATCHLIST_MOVIE = gql`
mutation addMovieToWatchlist($movie: MovieInput!) {
  addMovieToWatchlist(movie: $movie) {
   id
   watchlist {
     movieId
     title
     releaseYear
     imageURL
     overview
   }
 }
}`

export const REMOVE_WATCHLIST_MOVIE = gql`
mutation removeMovieFromWatchlist($input: MovieInput) {
  removeMovieFromWatchlist(input: $input) {
    id
  }
}
`;
