   export const saveWatchedMovieIds = (watchedIdArr) => {
    if (watchedIdArr.length) {
      localStorage.setItem('watched_movies', JSON.stringify(watchedIdArr));
    } else {
      localStorage.removeItem('watched_movies');
    }
  };
  
  export const removeWatchedMovieId = (watchedMovieId) => {
    const savedWatchedMovieIds = localStorage.getItem('watched_movies')
      ? JSON.parse(localStorage.getItem('watched_movies'))
      : null;
  
    if (!savedWatchedMovieIds) {
      return false;
    }
  
    return true;
  };
  
  export const getSavedWatchedMovieIds = () => {
    const savedWatchedMovies = localStorage.getItem('watched_movies')
      ? JSON.parse(localStorage.getItem('watched_movies'))
      : [];
  
    return savedWatchedMovies;
  };

  export const saveReviewIds = (reviewIdArr) => {
    if (reviewIdArr.length) {
      localStorage.setItem('reviews', JSON.stringify(reviewIdArr));
    } else {
      localStorage.removeItem('reviews');
    }
  };
  
  export const removeReviewId = (reviewId) => {
    const savedReviewIds = localStorage.getItem('reviews')
      ? JSON.parse(localStorage.getItem('reviews'))
      : null;
  
    if (!savedReviewIds) {
      return false;
    }
  
    return true;
  };
  
  export const getSavedReviewIds = () => {
    const savedReviews = localStorage.getItem('reviews')
      ? JSON.parse(localStorage.getItem('reviews'))
      : [];
  
    return savedReviews;
  };

  // export const saveReviews = (reviews) => {
  //   if (reviews.length) {
  //     localStorage.setItem('reviews', JSON.stringify(reviews));
  //   } else {
  //     localStorage.removeItem('reviews');
  //   }
  // };
  
  // export const addReview = (movieId, review) => {
  //   const reviews = getReviews();
  //   const movieIndex = reviews.findIndex(movie => movie.id === movieId);
  //   if (movieIndex >= 0) {
  //     reviews[movieIndex].reviews.push(review);
  //   } else {
  //     reviews.push({ id: movieId, reviews: [review] });
  //   }
  //   saveReviews(reviews);
  // };
  
  // export const getReviews = () => {
  //   const savedReviews = localStorage.getItem('reviews')
  //     ? JSON.parse(localStorage.getItem('reviews'))
  //     : [];
  
  //   return savedReviews;
  // };
  
  // export const deleteReview = (movieId, reviewIndex) => {
  //   const reviews = getReviews();
  //   const movieIndex = reviews.findIndex(movie => movie.id === movieId);
  //   if (movieIndex >= 0) {
  //     reviews[movieIndex].reviews.splice(reviewIndex, 1);
  //     saveReviews(reviews);
  //     return true;
  //   }
  //   return false;
  // };

  export const saveWatchlistMovieIds = (watchlistIdArr) => {
    if (watchlistIdArr.length) {
      localStorage.setItem('watchlist_movies', JSON.stringify(watchlistIdArr));
    } else {
      localStorage.removeItem('watchlist_movies');
    }
  };

export const getSavedWatchlistMovieIds = () => {
    const savedWatchlistMovieIds = localStorage.getItem('watchlist_movies')
      ? JSON.parse(localStorage.getItem('watchlist_movies'))
      : [];
  
    return savedWatchlistMovieIds;
  };
  
  export const removeWatchListMovieId = (watchlistMovieId) => {
    const savedWatchlistMovieIds = localStorage.getItem('watchlist_movies')
      ? JSON.parse(localStorage.getItem('watchlist_movies'))
      : null;
  
    if (!savedWatchlistMovieIds) {
      return false;
    }

    // const updatedWatchlistMovieIds = savedWatchlistMovieIds.filter(
    //   (movieId) => movieId !== watchlistMovieId
    // );

      // Remove the movie ID from the saved array
  const updatedWatchlistMovieIds = savedWatchlistMovieIds.filter(id => id !== watchlistMovieId);

    // localStorage.setItem(
    //   'watchlist_movies',
    //   JSON.stringify(updatedWatchlistMovieIds)
    // );
  
    // Update the saved watchlist in localStorage
  localStorage.setItem('watchlist_movies', JSON.stringify(updatedWatchlistMovieIds));
  
    // return updatedWatchlistMovieIds;
    return true;

  };