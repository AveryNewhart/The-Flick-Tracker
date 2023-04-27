import React, { useState } from 'react'
import "../styles/App.css"
import ProfileCard from '../components/ProfileCard';
import FavList from '../components/Favourites';
import WatchList from '../components/WatchList';
import MyReviews from '../components/MyReviews';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Navigation from "../components/Nav.js";
import Contianer from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

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
    maxWidth: '1400px'
  },
  // Profile Card and Top 5 Styles
  ProStyles: {
    // background: 'red',
    width:'100vw',
    justifyContent: 'center',
    marginBottom: '25px',
  },
  // Watch List Styles
  WatchListStyles: {
    justifyContent: 'center',
    alignItems: 'center',
    width:'100vw',
  },
  // Button Row Styles
  ButtonRowStyles: {
    marginTop: '35px',
    marginBottom: '35px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  // Individual Button Stytles
  ButtonStyles: {
    background: '#c10206',
    borderStyle: 'none',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      background: '#ff4444',
    },
    '&:active': {
      background: '#990000',
    },
  },
  ReviewStyles: {
    backgroundColor: 'blue'
  }

};

const Profile = () => {

  const [displayWatchList, setDisplayWatchList] = useState(true);

  const handleButtonClick = () => {
    setDisplayWatchList(!displayWatchList);
  };

  return (
    <div>
      <Navigation />
      <div className='profile'>
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
          <Row style={styles.ButtonRowStyles}>
            <Col>
              <Button 
               style={styles.ButtonStyles} 
               onClick={handleButtonClick}
               active={displayWatchList}>
               Watch List
              </Button>{' '}
            </Col>
            <Col>
              <Button
               style={styles.ButtonStyles}
               onClick={handleButtonClick}
               active={!displayWatchList}>
               Reviews
               </Button>{' '}
            </Col>
          </Row>
        {/* <Row style={styles.WatchListStyles}>
          <WatchList style={styles.WatchStyles}/>
          <MyReviews style={styles.ReviewStyles}/>
        </Row> */}
        {/* WatchList or MyReviews component */}
      {displayWatchList ? <WatchList /> : <MyReviews />}
      </Contianer>
      </div>
    </div>
  );
}

export default Profile;