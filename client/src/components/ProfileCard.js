import React from 'react';
import { Card } from 'react-bootstrap';

const ProfileCard = () => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img 
      variant="top" 
      src="https://via.placeholder.com/150"
      style={{ borderRadius: '50%', width: '150px', height: '150px', margin: 'auto' }} />
      <Card.Body>
        <Card.Title>User Name</Card.Title>
        <Card.Subtitle>Followers:</Card.Subtitle>
        <Card.Subtitle>Following</Card.Subtitle>
        <Card.Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProfileCard;