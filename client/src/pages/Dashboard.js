import React, { useState } from 'react';
import Contianer from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Navigation from "../components/Nav.js";
import ProfileCard from '../components/ProfileCard';
import DashFeed from '../components/Dashboard/DashFeed.js';
import FollowFeed from '../components/Dashboard/FollowFeed.js';

import "../styles/App.css"

const Dashboard = () => {
    return (
        <div>
           <Navigation />
        <Contianer>
            <Row>
                <Col><ProfileCard /></Col>
                <Col>
                 <Row>
                    <Button>New Reviews</Button>
                    <Button>Following</Button>
                 </Row>
                 <Row><p>2 of 3</p></Row>
                </Col>
                <Col><p>3 of 3</p></Col>
            </Row>
        </Contianer> 
        </div>
    )
}

export default Dashboard;