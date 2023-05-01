import React from 'react'
import { Link } from 'react-router-dom';
import "../styles/Searchbar.css";



const fetchMovies = (text) => {
    //   Fetch id.
    return fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=d3449ff6ec0c027623bf6b6f5fff78b3&language=en-US&query=${text}&page=1&include_adult=false`
    ).then((res) => res.json());
  };
  const getRatingColor = (rating) => {
    const percentage = rating * 10;
    if (percentage >= 66) {
      return " rating-green";
    } else if (percentage >= 33) {
      return " rating-yellow";
    } else {
      return " rating-red";
    }
  };
  const InputContainer = ({ handleChange }) => {
    return (
      <div className="input-container">
        <input
          className="search-field"
          type="search"
          onKeyUp={handleChange}
          list="movies"
          placeholder="Search for a movie..."
          // onClick={SearchedContent}
        />
      </div>
    );
  };
  const Movie = ({ movie }) => {
    const ratingColor = getRatingColor(movie.vote_average);
    return (
      <div className="movie">
        <img
          className="movie__poster"
          alt=''
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          style={{
            width: "35%",
            float: "left"
          }}
        />
        <div className="movie__details" style={{ width: "60%", float: "right" }}>
          <div className="details__header">
            <div className="header-container">
              <div className="movie-title">{movie.title}</div>
              <div className="header__year">
                {" "}
                ({movie.releaseYear && movie.imageURL.split("-")[0]})
              </div>
            </div>
            <div className="original-title">{movie.title}</div>
            <div className="rating-container">
              <div className={"rating" + ratingColor}>
                {`${movie.vote_average * 10}%`}
              </div>
              <span className="score-tag">User Score</span>
            </div>
          </div>
          <div className="overview">
            <h4 className="overview__header">Overview</h4>
            <p className="details__synopsis">{movie.synopsis}</p>
          </div>
        </div>
      </div>
    );
  };
  class Main extends React.Component {
    constructor() {
      super();
      this.state = {
        value: "",
        movies: [],
        movie: {},
        showDropdown: false
      };
      this.findMovie = this.findMovie.bind(this);
    }
    handleChange = (event) => {
      this.setState({ value: event.target.value, showDropdown: true });
      //     Search for movies.
      fetchMovies(this.state.value).then((data) => {
        this.setState({ movies: data.results });
      });
    };

    findMovie = (id) => {
      const movie = this.state.movies.find((movie) => movie.movieId === id);
      this.setState({ movie, showDropdown: false });
      this.props.history.push(`/movie/${id}`);
    };

    render() {
      const { movie, movies } = this.state;
      const movieSelected = Object.getOwnPropertyNames(movie).length !== 0;
  
      const getReleaseYear = (date) => {
        if (date && date.includes("-")) {
          return `(${date.split("-")[0]})`;
        }
      };
      


      return (
        <div
          className="mainSearchDiv"
          style={{
            backgroundImage:
              movieSelected &&
              `url(https://image.tmdb.org/t/p/original${movie.backdrop})`
          }}
        >
          <InputContainer handleChange={this.handleChange} />
          <div
            className="movies"
            id="dropdown"
            style={{ display: this.state.showDropdown ? "inherit" : "none" }}
          >
            {movies
              ? movies.slice(0, 10).map((movie) => {
                  return (
                    <Link
                      key={movie.id}
                      className="option"
                      to={`/movie/${movie.id}`}
                      onClick= {(event) => this.findMovie(movie.id, event) }
                      // href={SearchedContent}
                      // href="/searchedcontent"
                    >{`${movie.title} ${
                      movieSelected ? getReleaseYear(movie.releaseYear) : ""
                    }`}</Link>
                  );
                })
              : ""}
          </div>
          {movieSelected && <Movie movie={movie} />}
          {/* {movieSelected ? <Movie movie={movie} /> : <div>Loading...</div>} */}
        </div>
      );
    }
  }

   
  
//   ReactDOM.render(<Main />, document.getElementById("root"));
export default Main