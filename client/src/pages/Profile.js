import React from 'react'
import "../styles/App.css"
import ProfileCard from '../components/ProfileCard';
import FavList from '../components/Favourites';
import WatchList from '../components/WatchList';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Navigation from "../components/Nav.js";

import "../styles/App.css";

const styles = {
  containerStyles: {
    background: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
};

export default function Profile() {
  return (
    <div>
      <Navigation />
      <div>
    <div class="container" style={styles.containerStyles}>
      <Row xs={1} md={2} className="g-4">
      <Col>
        <ProfileCard />
      </Col>
      {/* Grid for user top 5 */}
      <Col>
        <FavList />
      </Col>      
      </Row>
    </div>
    <WatchList />
    </div>
    </div>
  );
}