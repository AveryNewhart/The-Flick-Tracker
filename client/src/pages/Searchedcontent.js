import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from "../components/Nav.js";
import "../styles/SearchedContent.css";
import { useMutation } from "@apollo/client";
import { Button } from "react-bootstrap";
import Auth from "../utils/auth";
import { saveWatchedMovieIds, 
  getSavedWatchedMovieIds,
  //  saveWatchLaterMovieIds, getSavedWatchLaterMovieIds
    } from "../utils/localStorage";
import { SAVE_WATCHED_MOVIE, 
  // SAVE_WATCH_LATER_MOVIE 
} from '../utils/mutations.js';


const SearchedContent = () => {
    const { id } = useParams(); // get the ID from the URL
    const [movie, setMovie] = useState(null); // set initial state to null
    const [review, setReview] = useState("");
    // const movieId = req.body.movieId;

      // saveWatchedMovie mutation hook
    const [addWatchedMovie, { error: errorWatched }] = useMutation(SAVE_WATCHED_MOVIE);

     // create state to hold saved wacthedMovieId values
    const [savedWatchedMovieIds, setSavedWatchedMovieIds] = useState(getSavedWatchedMovieIds());

    // // saveWatchLaterMovie mutation hook
    // const [addMovieToWatchlist, { error: errorWatchLater }] = useMutation(SAVE_WATCH_LATER_MOVIE);

    //  // create state to hold saved wacthLaterMovieId values
    // const [savedWatchLaterMovieIds, setSavedWatchLaterMovieIds] = useState(getSavedWatchLaterMovieIds());

    useEffect(() => {
      return () => saveWatchedMovieIds(savedWatchedMovieIds);
    });

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

  // useEffect(() => {
  //   // save watched movie IDs to local storage when the savedWatchedMovieIds state changes
  //   saveWatchedMovieIds(savedWatchedMovieIds);
  // }, [savedWatchedMovieIds]);

  // useEffect(() => {
  //   // save watch later movie IDs to local storage when the savedWatchLaterMovieIds state changes
  //   saveWatchLaterMovieIds(savedWatchLaterMovieIds);
  // }, [savedWatchLaterMovieIds]);

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

    // const token = Auth.getToken();

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
      // const { data: { addWatchedMovie: user } } = await addWatchedMovie({
      //   // variables: { input: { movieId } },  // <-- pass the movieId directly
      //   variables: { input: { movieId: watchedMovieToSave.movieId } },
      // });
      // await addWatchedMovie({
      //   variables: { input: { movieId } },
      // });
      // await addWatchedMovie({
      //   variables: { input: { movieId } },
      //   context: {
      //     headers: {
      //       authorization: `Bearer ${token}`
      //     }
      //   }
      // });

      // if movie successfully saves to user's account, save movie id to state
      setSavedWatchedMovieIds([...savedWatchedMovieIds, watchedMovieToSave.movieId]);
      // setWatchedMovies(user.watchedMovies);  // <-- set the watched movies data
    } catch (err) {
      console.error(err);
    }
  };


    // // create function to handle saving a movie that you've watched to our database
    //  const handleSaveToWatchLater = async (movieId) => {
    //   // find the movie in `searchedMovies` state by the matching id
    //   // const watchLaterMovieToSave = searchedMovies.find((movie) => movie.movieId === movieId);
  
    //   // get token
    //   const token = Auth.loggedIn() ? Auth.getToken() : null;
  
    //   if (!token) {
    //     return false;
    //   }
  
    //   try {
    //     // const { data } = await saveWatchLater({
    //     //   variables: { movie: watchLaterMovieToSave  },
    //     // });
    //     const { data: { addMovieToWatchlist: user } } = await addMovieToWatchlist({
    //       variables: { input: { movieId } },  // <-- pass the movieId directly
    //     });
  
    //     // if movie successfully saves to user's account, save movie id to state
    //     setSavedWatchLaterMovieIds([...savedWatchLaterMovieIds, movieId]);
    //     setWatchlist(user.watchlist);  // <-- set the watchlist movies data
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
          {/* <button className='reviewBtn'>Add to Watchlist</button>
          <button className='reviewBtn'>Add to Watched</button> */}
            {/* {Auth.loggedIn() && (
              <Button
                disabled={savedWatchedMovieIds?.some(
                  (savedWatchedMovieId) => savedWatchedMovieId === movie.movieId
                    )}
                    className="reviewBtn"
                    onClick={() => handleSaveToWatched(movie.movieId)}
                >
                  {savedWatchedMovieIds?.some(
                    (savedWatchedMovieId) => savedWatchedMovieId === movie.movieId
                  )
                    ? "This movie has already been saved!"
                    : "Save this Movie!"}
                </Button>
              )} */}
                 {Auth.loggedIn() && (
            // <Button onClick={() => handleSaveToWatched(movie.id)}>
            //   Save to Watched
            // </Button>
          //   <Button className="watched-btn" onClick={() => handleSaveToWatched(movie.id)} disabled={savedWatchedMovieIds?.some((savedMovieId) => savedMovieId === movie.id)}>
          //   {savedWatchedMovieIds?.some((savedMovieId) => savedMovieId === movie.id)
          //     ? "Watched"
          //     : "Save to Watched"}
          // </Button>
          <Button className='reviewBtn' variant="primary" onClick={() => handleSaveToWatched(movie.id)}>Save to Watched</Button>

          )}
          {/* <button className='reviewBtn'>Add to Watchlist</button>
          <button className='reviewBtn'>Add to Watched</button> */}
            {/* {Auth.loggedIn() && (
              <Button
                disabled={savedWatchLaterMovieIds?.some(
                  (savedWatchLaterMovieId) => savedWatchLaterMovieId === movie.movieId
                  )}
                  className="reviewBtn"
                  onClick={() => handleSaveToWatchLater(movie.movieId)}
              >
              {savedWatchLaterMovieIds?.some(
                (savedWatchLaterMovieId) => savedWatchLaterMovieId === movie.movieId
              )
                ? "This movie has already been saved to Watch Later!"
                : "Save this Movie to Watch Later!"}
              </Button>
              )} */}
          </div>
          <div className="reviewDiv">
            <label htmlFor="review" className="reviewText">Add Review:</label>
                <div className="inputWrapper">
                    <textarea type="text" id="review" className="reviewInput" value={review} onChange={handleReviewChange} />
                </div>
                <button className="reviewBtn" onClick={handleAddReview}>Add Review</button>
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
