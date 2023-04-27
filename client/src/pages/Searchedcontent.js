import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from "../components/Nav.js";
import "../styles/SearchedContent.css";
// import Auth from "../utils/auth";
// import { saveWatchedMovieIds, getSavedWatchedMovieIds, saveWatchLaterMovieIds, getSavedWatchLaterMovieIds  } from "../utils/localStorage";
// import { ADD_REVIEW, SAVE_WATCHED_MOVIE, SAVE_WATCH_LATER_MOVIE } from '../utils/mutations.js';


const SearchedContent = () => {
    const { id } = useParams(); // get the ID from the URL
    const [movie, setMovie] = useState(null); // set initial state to null
    const [review, setReview] = useState("");

    //   // saveWatchedMovie mutation hook
    // const [saveWatchedMovie, { error }] = useMutation(SAVE_WATCHED_MOVIE);

    //  // create state to hold saved wacthedMovieId values
    // const [savedWatchedMovieIds, setSavedWatchedMovieIds] = useState(getSavedWatchedMovieIds());

    // // saveWatchLaterMovie mutation hook
    // const [saveWatchLaterMovie, { error }] = useMutation(SAVE_WATCH_LATER_MOVIE);

    //  // create state to hold saved wacthLaterMovieId values
    // const [savedWatchLaterMovieIds, setSavedWatchLaterMovieIds] = useState(getSavedWatchLaterMovieIds());

    // useEffect(() => {
    //   return () => saveWatcheMovieIds(savedWatchedMovieIds);
    // });

    // useEffect(() => {
    //   return () => saveWatchLaterMovieIds(savedWatchLaterMovieIds);
    // });

  useEffect(() => {
    // fetch the movie data when the component mounts
       fetch(
         `https://api.themoviedb.org/3/movie/${id}?api_key=d3449ff6ec0c027623bf6b6f5fff78b3&language=en-US`
       )
       .then((response) => response.json())
        .then((data) => setMovie(data));
  }, [id]);

  if (!movie) {
    // show a loading message if the movie data is still being fetched
    return <div>Loading...</div>;
  }

  //  // create function to handle saving a movie that you've watched to our database
  //  const handleSaveToWatched = async (movieId) => {
  //   // find the movie in `searchedMovies` state by the matching id
  //   const watchedMovieToSave = searchedMovies.find((movie) => movie.movieId === movieId);

  //   // get token
  //   const token = Auth.loggedIn() ? Auth.getToken() : null;

  //   if (!token) {
  //     return false;
  //   }

  //   try {
  //     const { data } = await saveWatched({
  //       variables: { movie: watchedMovieToSave  },
  //     });

  //     // if movie successfully saves to user's account, save movie id to state
  //     setSavedWatchedMovieIds([...savedWatchedMovieIds, watchedMovieToSave.movieId]);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };


    // // create function to handle saving a movie that you've watched to our database
    //  const handleSaveToWatchLater = async (movieId) => {
    //   // find the movie in `searchedMovies` state by the matching id
    //   const watchLaterMovieToSave = searchedMovies.find((movie) => movie.movieId === movieId);
  
    //   // get token
    //   const token = Auth.loggedIn() ? Auth.getToken() : null;
  
    //   if (!token) {
    //     return false;
    //   }
  
    //   try {
    //     const { data } = await saveWatchLater({
    //       variables: { movie: watchLaterMovieToSave  },
    //     });
  
    //     // if movie successfully saves to user's account, save movie id to state
    //     setSavedWatchLaterMovieIds([...savedWatchLaterMovieIds, watchLaterMovieToSave.movieId]);
    //   } catch (err) {
    //     console.error(err);
    //   }
    // };



  const handleReviewChange = (event) => {
    setReview(event.target.value);
  }

  const handleAddReview = () => {
    // add review logic here
    console.log(`Review for ${movie.title}: ${review}`);
    setReview("");
  }

//   const ratingColor = getRatingColor(movie.vote_average);
  return (
    <div>
        <Navigation />
      {movie ? (
        <div className="movie-details">
          <section className='mainContent'>
          <h1 className='movieTitle'>{movie.title}</h1>
          <img className='movie__poster' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} 
            style={{
                width: "35%",
                float: "left"
              }}/>
          <p>Release date: {movie.release_date}</p>
          <p>Vote average: {movie.vote_average}</p>
          <div className={"rating"}>
                {`${movie.vote_average * 10}%`}
              </div>
          <div className="overview">
            <h4 className="overview__header">Overview</h4>
            <p className="details__synopsis">{movie.overview}</p>
          </div>
          <div className='watchButtons'>
          <button>Add to Watchlist</button>
          <button>Add to Watched</button>
          </div>
          <div className="reviewDiv">
            <label htmlFor="review" className="reviewText">Add Review:</label>
                <div className="inputWrapper">
                    <textarea type="text" id="review" className="reviewInput" value={review} onChange={handleReviewChange} />
                </div>
                <button onClick={handleAddReview}>Add Review</button>
            </div>
          </section>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default SearchedContent;
