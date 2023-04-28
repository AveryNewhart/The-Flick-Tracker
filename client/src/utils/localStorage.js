// export const getSavedWatchedMovieIds = () => {
//     const savedWatchedMovieIds = localStorage.getItem('watched_movies')
//       ? JSON.parse(localStorage.getItem('watched_movies'))
//       : [];
  
//     return savedWatchedMovieIds;
//   };
  
//   export const saveWatchedMovieIds = (watchedIdArr) => {
//     if (watchedIdArr.length) {
//       localStorage.setItem('watched_movies', JSON.stringify(watchedIdArr));
//     } else {
//       localStorage.removeItem('watched_movies');
//     }
//   };
  
//   export const removeWatchedMovieId = (watchedMovieId) => {
//     const savedWatchedMovieIds = localStorage.getItem('watched_movies')
//       ? JSON.parse(localStorage.getItem('watched_movies'))
//       : null;
  
//     if (!savedWatchedMovieIds) {
//       return false;
//     }
  
//     const updatedSavedWatchedMoviesIds = savedWatchedMovieIds?.filter((savedWatchedMovieId) => watchedMovieId !== watchedMovieId);
//     localStorage.setItem('watched_movies', JSON.stringify(updatedSavedWatchedMovieIds));
  
//     return true;
//   };

// export const getSavedWatchLaterMovieIds = () => {
//     const savedWatchLaterMovieIds = localStorage.getItem('watchlater_movies')
//       ? JSON.parse(localStorage.getItem('watchlater_movies'))
//       : [];
  
//     return savedWatchLaterMovieIds;
//   };
  
//   export const saveWatchLaterMovieIds = (watchLaterIdArr) => {
//     if (watchLaterIdArr.length) {
//       localStorage.setItem('watchlater_movies', JSON.stringify(watchLaterIdArr));
//     } else {
//       localStorage.removeItem('watchlater_movies');
//     }
//   };
  
//   export const removeWatchLaterMovieId = (watchLaterMovieId) => {
//     const savedWatchLaterMovieIds = localStorage.getItem('watchlater_movies')
//       ? JSON.parse(localStorage.getItem('watchlater_movies'))
//       : null;
  
//     if (!savedWatchLaterMovieIds) {
//       return false;
//     }
  
//     const updatedSavedWatchLaterMoviesIds = savedWatchLaterMovieIds?.filter((savedWatchLaterMovieId) => watchLaterMovieId !== watchLaterMovieId);
//     localStorage.setItem('watchlater_movies', JSON.stringify(updatedSavedWatchLaterMovieIds));
  
//     return true;
//   };