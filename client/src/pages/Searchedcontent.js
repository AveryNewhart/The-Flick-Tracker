import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from "../components/Nav.js";
import "../styles/SearchedContent.css";
import { useMutation } from "@apollo/client";
import { Button } from "react-bootstrap";
import Auth from "../utils/auth";
import { saveWatchedMovieIds, 
  getSavedWatchedMovieIds, saveWatchlistMovieIds, getSavedWatchlistMovieIds, getSavedReviewIds, saveReviewIds 
} from "../utils/localStorage";
import { SAVE_WATCHED_MOVIE, SAVE_WATCHLIST_MOVIE, ADD_REVIEW } from '../utils/mutations.js';


const SearchedContent = () => {
    const { id } = useParams(); // get the ID from the URL
    const [movie, setMovie] = useState(null); // set initial state to null

    // const [review, setReview] = useState("");
    
    // const movieId = req.body.movieId;

    const [addReview, { error: addReviewError }] = useMutation(ADD_REVIEW);

    const [savedReviewIds, setSavedReviewIds] = useState(getSavedReviewIds());

      // saveWatchedMovie mutation hook
    const [addWatchedMovie, { error: errorWatched }] = useMutation(SAVE_WATCHED_MOVIE);

     // create state to hold saved wacthedMovieId values
    const [savedWatchedMovieIds, setSavedWatchedMovieIds] = useState(getSavedWatchedMovieIds());

    // saveWatchLaterMovie mutation hook
    const [addMovieToWatchlist, { error: errorWatchLater }] = useMutation(SAVE_WATCHLIST_MOVIE);

     // create state to hold saved wacthLaterMovieId values
    const [savedWatchlistMovieIds, setSavedWatchlistMovieIds] = useState(getSavedWatchlistMovieIds());


    useEffect(() => {
      return () => saveWatchedMovieIds(savedWatchedMovieIds);
    });

    useEffect(() => {
      return () => saveWatchlistMovieIds(savedWatchlistMovieIds);
    });

    useEffect(() => {
      return () => saveReviewIds(savedReviewIds);
    });

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

   // create function to handle saving a movie that you've watched to our database
   const handleSaveToWatched = async (movieId) => {
    // find the movie in `searchedMovies` state by the matching id
    // const watchedMovieToSave = movie.find((movie) => movie.movieId === movieId);

      // check if the movie is already in the saved watched movies
      if (savedWatchedMovieIds.includes(movieId)) {
        console.log("Movie already saved as watched!");
          return;
      }

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const watchedMovieToSave = {
        movieId: movie.id,
        title: movie.title,
        imageURL: movie.poster_path,
        overview: movie.overview,
        releaseYear: movie.release_date
        // vote_average: movie.vote_average,
        // vote_count: movie.vote_count
      };

      const { data } = await addWatchedMovie({
        variables: { movie: watchedMovieToSave  },
      });
 
      // if movie successfully saves to user's account, save movie id to state
      setSavedWatchedMovieIds([...savedWatchedMovieIds, watchedMovieToSave.movieId]);
      // setWatchedMovies(user.watchedMovies);  // <-- set the watched movies data
    } catch (err) {
      console.error(err);
    }
  };

    // create function to handle saving a movie that you've watched to our database
    const handleSaveToWatchlist = async (movieId) => {
      // find the movie in `searchedMovies` state by the matching id
      // const watchedMovieToSave = movie.find((movie) => movie.movieId === movieId);
  
        // check if the movie is already in the saved watched movies
        if (savedWatchlistMovieIds.includes(movieId)) {
          console.log("Movie already saved as watched!");
            return;
        }
  
      // get token
      const token = Auth.loggedIn() ? Auth.getToken() : null;
  
      if (!token) {
        return false;
      }
  
      try {
        const watchlistMovieToSave = {
          movieId: movie.id,
          title: movie.title,
          imageURL: movie.poster_path,
          overview: movie.overview,
          releaseYear: movie.release_date
          // vote_average: movie.vote_average,
          // vote_count: movie.vote_count
        };
  
        const { data } = await addMovieToWatchlist({
          variables: { movie: watchlistMovieToSave  },
        });
   
        // if movie successfully saves to user's account, save movie id to state
        setSavedWatchlistMovieIds([...savedWatchlistMovieIds, watchlistMovieToSave.movieId]);
        // setWatchedMovies(user.watchedMovies);  // <-- set the watched movies data
      } catch (err) {
        console.error(err);
      }
    };

     // create function to handle saving a movie that you've watched to our database
     const handleSaveReview = async (movieId, review) => {
      // find the movie in `searchedMovies` state by the matching id
      // const watchedMovieToSave = movie.find((movie) => movie.movieId === movieId);
  
        // check if the movie is already in the saved watched movies
        if (savedReviewIds.includes(movieId, review)) {
          console.log("Movie already saved as watched!");
            return;
        }
  
      // get token
      const token = Auth.loggedIn() ? Auth.getToken() : null;
  
      if (!token) {
        return false;
      }
  
      try {
        const reviewedMovie = {
          movieId: movie.id,
          title: movie.title,
          reviewAuthor: movie.review.reviewAuthor,
          reviewText: movie.review.reviewText
          // vote_average: movie.vote_average,
          // vote_count: movie.vote_count
        };
  
        const { data } = await addReview({
          variables: { review: reviewedMovie  },
        });
   
        // if movie successfully saves to user's account, save movie id to state
        setSavedReviewIds([...savedReviewIds, reviewedMovie.movieId.reviewId]);
        // setWatchedMovies(user.watchedMovies);  // <-- set the watched movies data
      } catch (err) {
        console.error(err);
      }
    };

  
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
         <div class="pContainer">
  <p className="searchedPs">Release date: {movie.release_date}</p>
  <p className="searchedPs">Vote average: {movie.vote_average.toFixed(1)}</p>
  <div className={" searchedPs voteBorder"}>
                {`${movie.vote_average * 10}%`}
              </div>
</div>
          {/* <div className={"rating"}>
                {`${movie.vote_average * 10}%`}
              </div> */}
          <div className="overview">
            <h4 className="overview__header">Overview</h4>
            <p className="details__synopsis">{movie.overview}</p>
          </div>
          <div className='watchButtons'>
                 {Auth.loggedIn() && (
                  <>
          <Button variant="primary" className="reviewBtn" onClick={() => handleSaveToWatched(movie.id)}>Save to Watched</Button>
          <Button variant="primary" className="reviewBtn" onClick={() => handleSaveToWatchlist(movie.id)}>Save to Watchlist</Button>
          </>
          )}
          </div>
          {/* <div className="reviewDiv">
            <label htmlFor="review" className="reviewText">Add Review:</label>
                <div className="inputWrapper">
                    <textarea type="text" id="review" className="reviewInput" value={review} onChange={handleReviewChange} />
                </div>
                <button className="reviewBtns" onClick={handleAddReview}>Add Review</button>
            </div> */}
            <div className='reviewDiv'>
              <label htmlFor="review" className="reviewText">Add Review:</label>
                <div>
                  <textarea
                  className='reviewInput'
                    type="text"
                    placeholder="Add a review"
                    // value={movie.review.reviewText}
                    // onChange={(e) => setReview(e.target.value)}
                  />
                </div>
                <Button className="reviewBtns" onClick={() => handleSaveReview(movie.review.id)}>Add Review</Button>
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
