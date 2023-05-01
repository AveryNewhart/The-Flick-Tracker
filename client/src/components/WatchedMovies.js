import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_PROTECTED } from '../utils/queries';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
// import Auth from "../utils/auth";


const WatchedMovies = () => {

//   You can remove this query since you're passing the `watchedMovies` prop
  const { loading, data } = useQuery(QUERY_PROTECTED);
  const userData = data?.protected || {};

  return (
    <Container fluid>
      <Row xs={2} md={5} className="g-4">
      <h2>Watched Movies</h2>
        {userData.WatchedMovies?.map((movie) => (
          <Col key={movie.id} style={{ justifyContent: 'center', display: 'flex' }}>
            <Card style={{ width: '12rem', height: '18rem' }}>
              <Card.Img variant="top" src={movie.imageURL} />
              <Card.ImgOverlay>
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                </Card.Body>
              </Card.ImgOverlay>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );

  // return (
  //   <div>
  //     <h2>Watched Movies</h2>
  //     {userData.watchedMovies.length ? (
  //       <ul>
  //         {userData.watchedMovies.map((movie) => (
  //           <li key={movie.movieId}>
  //             <h3>{movie.title}</h3>
  //             {/* <p>Released: {movie.releaseYear}</p> */}
  //             <p>{movie.imageURL}</p>
  //       <p>overview: {movie.overview}</p>
  //       {/* <p>Release Data {movie.releaseYear}</p> */}
  //             {/* <p>Director: {movie.director}</p> */}
  //             {/* Add more properties as needed */}
  //           </li>
  //         ))}
  //       </ul>
  //     ) : (
  //       <p>No watched movies yet.</p>
  //     )}
  //   </div>
  // );
};

export default WatchedMovies;
