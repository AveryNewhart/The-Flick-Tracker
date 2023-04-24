import React from 'react'
import "../styles/App.css"
import ProfileCard from '../components/ProfileCard';
import FavList from '../components/Favourites';
import WatchList from '../components/WatchList';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Navigation from "../components/Nav.js";
import Contianer from 'react-bootstrap/Container'

import "../styles/Profile.css";

const styles = {
  // Overall Container Styles
  containerStyles: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    minWidth: '100vw',
    marginX: '20px',
  },
  // Profile Card and Top 5 Styles
  ProStyles: {
    background: 'red',
  },
  // Watch List Styles
  WatchListStyles: {
    backgroundColor: 'blue',
  },
};

const Profile = () => {
  return (
    <div>
      <Navigation />
      <Contianer fluid style={styles.containerStyles}>
          <Row xs={1} md={2} className="g-4" style={styles.ProStyles}>
          <Col md='auto'>
          <ProfileCard />
          </Col>
          {/* Grid for user top 5 */}
          <Col>
            <h2>My Top Five</h2>
            <FavList />
          </Col>      
          </Row>
        <Row style={styles.WatchListStyles}>
          <WatchList />
        </Row>
      </Contianer>
    </div>
  );
}

export default Profile;