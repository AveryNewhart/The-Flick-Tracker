import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from "../components/Nav.js";
import "../styles/SearchedContent.css";

const SearchedContent = () => {
    const { id } = useParams(); // get the ID from the URL
    const [movie, setMovie] = useState(null); // set initial state to null
    const [review, setReview] = useState("");

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
          <button>add to watchlist</button>
          <button>add to watched</button>
          </div>
          <div className="reviewDiv">
            <label htmlFor="review" className="reviewText">Add Review:</label>
                <div className="inputWrapper">
                    <textarea type="text" id="review" className="reviewInput" value={review} onChange={handleReviewChange} />
                </div>
                <button onClick={handleAddReview}>Add Review</button>
            </div>

        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default SearchedContent;
