import React from 'react'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const WatchList = () => {
    return (
    <container fluid>
      <Row xs={1} md={5} className="g-4">
        {Array.from({ length: 10 }).map((_, idx) => (
          <Col>
            <Card style={{ width: '12rem', height: '18rem', }}>
              <Card.Img variant="top" src="https://via.placeholder.com/150" />
              <Card.ImgOverlay>
              <Card.Body>
                <Card.Title>Card title</Card.Title>
              </Card.Body>
              </Card.ImgOverlay>
            </Card>
          </Col>
        ))}
      </Row>
    </container>
    );
  }

export default WatchList;