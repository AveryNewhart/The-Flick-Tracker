import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_PROTECTED } from '../utils/queries';
import Auth from "../utils/auth";
import { Button } from "react-bootstrap";

import { removeWatchedMovieId } from "../utils/localStorage";
import { REMOVE_WATCHED_MOVIE } from '../utils/mutations';


const WatchedMovies = () => {

  const [removeWatchedMovie, { error }] = useMutation(REMOVE_WATCHED_MOVIE)

//   You can remove this query since you're passing the `watchedMovies` prop
  const { loading, data } = useQuery(QUERY_PROTECTED);
  const userData = data?.protected || {};

  const handleDeleteWatchedMovie = async (movieId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeWatchedMovie({ variables: { input: { movieId  } } });

      // upon success, remove book's id from localStorage
      removeWatchedMovieId(movieId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Watched Movies</h2>
      {userData.watchedMovies.length ? (
        <ul>
          {userData.watchedMovies.map((movie) => (
            <li key={movie.movieId}>
              <h3>{movie.title}</h3>
              <p>Released: {movie.releaseYear}</p>
              {/* <img>{movie.imageURL}</img> */}
              <img className='movie__poster' src={`https://image.tmdb.org/t/p/w500${movie.imageURL}`} alt={movie.title} 
            style={{
                width: "10%",
                height: "10%"
                // float: "left"
              }}/>
        <p>overview: {movie.overview}</p>
        <Button
                        className="btn-block btn-danger"
                        onClick={() => handleDeleteWatchedMovie(movie.movieId)}
                      >
                        Delete this Movie!
                      </Button>
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
