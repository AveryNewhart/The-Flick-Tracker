import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

const WatchedMovies = ({ moviesWatched }) => {
//   You can remove this query since you're passing the `watchedMovies` prop
  const { loading, data } = useQuery(QUERY_USER);
  const watchedMovies = data?.me?.watchedMovies || [];

  return (
    <div>
      <h2>Watched Movies</h2>
      {watchedMovies.length ? (
        <ul>
          {watchedMovies.map((movie) => (
            <li key={movie.movieId}>
              <h3>{movie.title}</h3>
              <p>Released: {movie.releaseDate}</p>
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
