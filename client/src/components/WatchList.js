import React from 'react';
import { useQuery } from '@apollo/client';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { useParams } from 'react-router-dom';

import { QUERY_USER } from '../utils/queries';

const WatchList = () => {
  const { username } = useParams();
  const { loading, data } = useQuery(QUERY_USER, {
    variables: { username },
  });

  const user = data?.user || {};

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <Container fluid>
      <Row xs={2} md={5} className="g-4">
        {user.watchlist?.map((movie) => (
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
};

export default WatchList;

// return (
//   <container fluid>
//     <Row xs={2} md={5} className="g-4">
//       {Array.from({ length: 10 }).map((_, idx) => (
//         <Col style={{justifyContent: 'center', display: 'flex'}}>
//           <Card style={{ width: '12rem', height: '18rem', }}>
//             <Card.Img variant="top" src="https://via.placeholder.com/150" />
//             <Card.ImgOverlay>
//             <Card.Body>
//               <Card.Title>Card title</Card.Title>
//             </Card.Body>
//             </Card.ImgOverlay>
//           </Card>
//         </Col>
//       ))}
//     </Row>
//   </container>
//   );