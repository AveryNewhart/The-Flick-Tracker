import React, { useState } from 'react';
import Contianer from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Navigation from '../components/Nav.js';
import ProfileCard from '../components/ProfileCard';
import DashFeed from '../components/Dashboard/DashFeed.js';
import FollowFeed from '../components/Dashboard/FollowFeed.js';
import UserSearch from '../components/UserSearch.js';

import "../styles/App.css"
import "../styles/Dash.css"

const styles = {
    // Overall Container Styles
    containerStyles: {
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      minWidth: '100vw',
      maxWidth: '1400px'
    },
    rowStyles: {
        width: '100%',
    },
    btnStyles: {
      backgroundColor: '#c10206',
      borderStyle: 'none',
      marginBottom: '35px',
      marginTop: '35px',
      display: 'flex',
      justifyContent: 'center',
      color: 'white',
      transition: 'background-color 0.3s ease',
      '&:active': {
        background: '#ff0000',
      },
    }
}

const Dashboard = () => {
    const [activeButton, setActiveButton] = useState('following');
  
    const handleButtonClick = (buttonName) => {
      setActiveButton(buttonName);
    }
  
    return (
      <div>
        <Navigation />
        <Contianer style={styles.containerStyles} className='container'>
          <Row style={styles.rowStyles}>
            <Col className='profCol'><ProfileCard /></Col>
            <Col xs={6}>
              <Row className='btnRow'>
                <Col>
                  <Button
                    className='btn'
                    style={styles.btnStyles}
                    variant={activeButton === 'following' ? 'primary' : 'outline-primary'}
                    onClick={() => handleButtonClick('following')}
                  >
                    Following
                  </Button>
                </Col>
                <Col>
                  <Button
                    className='btn'
                    style={styles.btnStyles}
                    variant={activeButton === 'suggestions' ? 'primary' : 'outline-primary'}
                    onClick={() => handleButtonClick('suggestions')}
                  >
                    Suggestions
                  </Button>
                </Col>
              </Row>
              {activeButton === 'following' ? <FollowFeed /> : <DashFeed />}
            </Col>
            <Col><UserSearch /></Col>
          </Row>
        </Contianer>
      </div>
    )
  }
  
  export default Dashboard;