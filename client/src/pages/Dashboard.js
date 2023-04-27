import React, { useState } from 'react';
import Contianer from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Navigation from "../components/Nav.js";
import ProfileCard from '../components/ProfileCard';

import "../styles/App.css"

const Dashboard = () => {
    return (
        <div>
           <Navigation />
        <Contianer>
            <Row>
                <Col><ProfileCard /></Col>
                <Col><p>2 of 3</p></Col>
                <Col><p>3 of 3</p></Col>
            </Row>
        </Contianer> 
        </div>
    )
}

export default Dashboard;