import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_PROTECTED } from '../utils/queries';
// import Auth from "../utils/auth";

const WatchedMovies = () => {
//   You can remove this query since you're passing the `watchedMovies` prop
  const { loading, data } = useQuery(QUERY_PROTECTED);
  const userData = data?.protected || {};

  return (
    <div>
      <h2>Watched Movies</h2>
      {userData.watchedMovies.length ? (
        <ul>
          {userData.watchedMovies.map((movie) => (
            <li key={movie.movieId}>
              <h3>{movie.title}</h3>
              {/* <p>Released: {movie.releaseYear}</p> */}
              <p>{movie.imageURL}</p>
        <p>overview: {movie.overview}</p>
        {/* <p>Release Data {movie.releaseYear}</p> */}
              {/* <p>Director: {movie.director}</p> */}
              {/* Add more properties as needed */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No watched movies yet.</p>
      )}
    </div>
  );
};

export default WatchedMovies;
