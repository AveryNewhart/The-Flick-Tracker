import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

const QUERY_USER = gql`
  query Query($username: String!) {
    user(username: $username) {
      id
      username
      watchlist {
        movieId
        title
        imageURL
      }
    }
  }
`;

const UserWatchList = () => {
  const { username } = useParams();
  const { loading, data } = useQuery(QUERY_USER, {
    variables: { username },
  });

  if (loading) {
    return <h2>Loading...</h2>;
  }

  const { watchlist } = data.user || {};

  return (
    <Container fluid>
      <Row xs={2} md={5} className="g-4">
        {watchlist?.map((movie) => (
          <Col
            key={movie.movieId}
            style={{
              justifyContent: 'center',
              display: 'flex',
              marginBottom: '2rem',
            }}
          >
            <Card
              style={{
                width: '12rem',
                height: '18rem',
                borderStyle: 'none',
              }}
            >
              <Card.Img
                variant="top"
                src={`https://image.tmdb.org/t/p/w500${movie.imageURL}`}
                alt={movie.title}
                onClick={() =>
                  (window.location.href = `http://localhost:3000/movie/${movie.movieId}`)
                }
                style={{ cursor: 'pointer', borderRadius: '5px' }}
              />

              <Card.Body>
                <Card.Title
                  style={{ textAlign: 'center', fontSize: '1rem' }}
                >
                  {movie.title}
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default UserWatchList;