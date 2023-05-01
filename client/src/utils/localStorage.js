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