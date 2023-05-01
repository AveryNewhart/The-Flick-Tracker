import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_PROTECTED } from '../utils/queries';
import Auth from "../utils/auth";
import { Button } from "react-bootstrap";

import { removeWatchListMovieId } from "../utils/localStorage";
import { REMOVE_WATCHLIST_MOVIE } from '../utils/mutations';


const WatchList = () => {
  const [watchlistData, setWatchlistData] = useState([]);
  const [removeMovieFromWatchlist, { error }] = useMutation(REMOVE_WATCHLIST_MOVIE);
  const { loading, data } = useQuery(QUERY_PROTECTED);
  const userData = data?.protected || {};

  const handleDeleteWatchlistMovie = async (movieId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeMovieFromWatchlist({ variables: { input: { movieId  } } });

      // upon success, remove movies id from localStorage
      removeWatchListMovieId(movieId);

      // update watchlist state
      setWatchlistData(watchlistData.filter(movie => movie.movieId !== movieId));

          // Remove the movie ID from localStorage
          removeWatchListMovieId(movieId);
    } catch (err) {
      console.error(err);
    }
  };

    // // update watchlist state on initial load
    // useState(() => {
    //   setWatchlist(userData.watchlist || []);
    // }, [userData]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
      <Container fluid>
        <Row xs={2} md={5} className="g-4">
          {userData.watchlist?.map((movie) => (
            <Col key={movie.movieId} style={{ justifyContent: 'center', display: 'flex', marginBottom: '2rem' }}>
              <Card style={{ width: '12rem', height: '18rem', borderStyle: 'none' }}>
                <Card.Img 
                  variant="top" 
                  src={`https://image.tmdb.org/t/p/w500${movie.imageURL}`} 
                  alt={movie.title}
                  onClick={() => window.location.href = `http://localhost:3000/movie/${movie.movieId}`}
                  style={{ cursor: 'pointer', borderRadius: '5px' }}
                />
  
                  <Card.Body>
                    <Card.Title style={{textAlign: 'center', fontSize: '1rem'}}>{movie.title}</Card.Title>
                  </Card.Body>
                    <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteWatchlistMovie(movie.movieId)}
                  >
                    Delete this Movie!
                  </Button>
  
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
};

export default WatchList;
