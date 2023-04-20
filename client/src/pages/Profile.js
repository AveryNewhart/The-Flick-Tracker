import React from 'react'
import "../styles/App.css"
import ProfileCard from '../components/ProfileCard';
import FavList from '../components/Favourites';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const styles = {
  containerStyles: {
    background: 'orange',
  },
};

export default function Profile() {
  return (
    <div class="container" style={styles.containerStyles}>
      <Row xs={1} md={2} className="g-4">
      <Col>
        <ProfileCard />
      </Col>
      {/* Grid for user top 5 */}
      <div>
      <Col>
        <FavList />
      </Col>      
      </div>
      </Row>
    </div>
  );
}