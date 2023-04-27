import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

const ProfileCard = () => {

  const [userData, setUserData] = useState(null);
useEffect(() => {
  fetch('/api/user')
  .then(response => response.json())
  .then(data => setUserData(data))
 }, [])

 return (
  <Card style={{ width: '18rem' }}>
    <Card.Img 
      variant="top" 
      src={userData ? userData.avatarUrl : 'https://via.placeholder.com/150'}
      style={{ borderRadius: '50%', width: '150px', height: '150px', margin: 'auto' }} />
    <Card.Body>
      <Card.Title>{userData ? userData.name : 'User Name'}</Card.Title>
      <Card.Subtitle>Followers: {userData ? userData.followers : 0}</Card.Subtitle>
      <Card.Subtitle>Following: {userData ? userData.following : 0}</Card.Subtitle>
      <Card.Text>
        {userData ? userData.bio : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
      </Card.Text>
    </Card.Body>
  </Card>
);
};

export default ProfileCard;