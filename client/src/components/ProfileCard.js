import React from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { QUERY_PROTECTED } from "../utils/queries";

const styles = {
  cardStyles: {
    width: '18rem',
    padding: '0.5rem',
  }
}

const ProfileCard = () => {
  const { username } = useParams();
   // Query current user data
  //  const { loading, data } = useQuery(QUERY_PROTECTED);
  const { loading, data } = useQuery(QUERY_PROTECTED, 
    {
    variables: { username },
  });
  
   // Check if user data is present else provide empty obj
   const user = data?.protected;
   console.log(user)

  if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  // const user = data.user;
  if (!user) return <p>User not found</p>;

  return (
    <Card style={styles.cardStyles}>
      {/* <Card.Img 
        variant="top" 
        src={user.avatarUrl || 'https://via.placeholder.com/150'}
        style={{ borderRadius: '50%', width: '150px', height: '150px', margin: 'auto' }} /> */}
      <Card.Body>
        <Card.Title>{user.username || 'User Name'}</Card.Title>
        <Card.Subtitle>Followers: {user.followers || 0}</Card.Subtitle>
        <Card.Subtitle>Following: {user.following || 0}</Card.Subtitle>
        {/* <Card.Text>
          {user.bio || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
        </Card.Text> */}
      </Card.Body>
    </Card>
  );
};

export default ProfileCard;