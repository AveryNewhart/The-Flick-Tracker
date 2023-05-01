import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_PROTECTED } from '../utils/queries';
import Auth from "../utils/auth";
import { Button } from "react-bootstrap";

import { removeWatchedMovieId } from "../utils/localStorage";
import { REMOVE_WATCHED_MOVIE } from '../utils/mutations';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';


const WatchedMovies = () => {
  const [removeWatchedMovie, { error }] = useMutation(REMOVE_WATCHED_MOVIE);
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
    <Container fluid>
      <Row xs={2} md={5} className="g-4">
        {userData.watchedMovies?.map((movie) => (
          <Col key={movie.movieId} style={{ justifyContent: 'center', display: 'flex', marginBottom: '7rem' }}>
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
                  onClick={() => handleDeleteWatchedMovie(movie.movieId)}
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

export default WatchedMovies;
