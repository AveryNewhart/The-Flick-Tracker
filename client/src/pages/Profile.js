import React, { useState } from 'react'
import "../styles/App.css"
import ProfileCard from '../components/ProfileCard';
// import FavList from '../components/Favourites';
import WatchedMovies from '../components/WatchedMovies';
import WatchList from '../components/WatchList';
import MyReviews from '../components/MyReviews';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Navigation from "../components/Nav.js";
import Container from 'react-bootstrap/Container';
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
    marginBottom: '3rem',
    display: 'flex',
    justifyContent: 'space-between',
  },
  // Individual Button Stytles
  ButtonStyles: {
    background: '#c10206',
    width: '100%',
    height: '100%',
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
  const [displayMyReviews, setDisplayMyReviews] = useState(true);

  const handleButtonClick = (display) => {
    setDisplayWatchList(display);
    setDisplayMyReviews(display);
  };

  return (
    <div>
      <Navigation />
      <div className='profile'>
        <Container fluid style={styles.containerStyles}>
          <Row xs={1} md={2} className="g-4" style={styles.ProStyles}>
            <Col md='auto'>
              <ProfileCard />
            </Col>
          </Row>
          <Row style={styles.ButtonRowStyles}>
            <Col>
              <Button
                style={styles.ButtonStyles}
                onClick={() => handleButtonClick(true)}
                active={displayWatchList}>
                Watch List
              </Button>
            </Col>
            <Col>
              <Button
                style={styles.ButtonStyles}
                onClick={() => handleButtonClick(true)}
                active={displayMyReviews}>
                Reviews
              </Button>
            </Col>
            <Col>
              <Button
                style={styles.ButtonStyles}
                onClick={() => handleButtonClick(false)}
                active={!displayWatchList}>
                Watched Movies
              </Button>
            </Col>
          </Row>
          {/* {displayWatchList ? <WatchList /> : <MyReviews /> : <WatchedMovies /> } */}
          {displayWatchList ? <WatchList /> : (displayMyReviews ? <MyReviews /> : <WatchedMovies />)}
          {/* Render WatchList or MyReviews component based on displayWatchList state */}
        </Container>
      </div>
    </div>
  );
}

export default Profile;