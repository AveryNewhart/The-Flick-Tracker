import React from "react";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';


const MovieDesc = (movie) => {
  return (
    <div>
        Movie Description Page
        <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
      <Card.Body>
        <Card.Title>Movie Title</Card.Title>
        <Card.Text>
          This will be the image
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Year</ListGroup.Item>
        <ListGroup.Item>Genre</ListGroup.Item>
        <ListGroup.Item>Run Time</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
    </Card>
    <Card>
      <Card.Body>This is where the movie description will go</Card.Body>
    </Card>
    </div>
  );
}

export default MovieDesc;