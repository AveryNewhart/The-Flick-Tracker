import React from 'react';
import { useQuery, 
  // useMutation 
} from '@apollo/client';
// import Auth from "../utils/auth";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
// import { useParams } from 'react-router-dom';

// import { removeReviewId } from "../utils/localStorage";
// import { REMOVE_REVIEW } from '../utils/mutations';

import { QUERY_PROTECTED } from '../utils/queries';

const MyReviews = () => {
  // const { username } = useParams();
  const { loading, data } = useQuery(QUERY_PROTECTED);
  const userData = data?.protected || {};

  // const user = data?.user || {};

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <Container fluid>
      <h1>My Reviews</h1>
      <Row xs={2} md={5} className="g-4">
        {userData.review?.map((movie) => (
          <Col key={movie.id} style={{ justifyContent: 'center', display: 'flex' }}>
            <Card style={{ width: '12rem', height: '18rem' }}>
              <Card.Img variant="top" src={movie.imageURL} />
              <Card.ImgOverlay>
                <Card.Body>
                  <Card.Title>{movie.review.reviewText}</Card.Title>
                  <p>{movie.review.reviewAuthor}</p>
                </Card.Body>
              </Card.ImgOverlay>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MyReviews;