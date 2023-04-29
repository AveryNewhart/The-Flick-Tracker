import React from 'react';
import { Card } from 'react-bootstrap';
import { useQuery, gql } from '@apollo/client';

const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      reviews {
        _id
        reviewText
        createdAt
      }
    }
  }
`;

const ProfileCard = ({ username }) => {
  const { loading, error, data } = useQuery(QUERY_USER, {
    variables: { username },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const user = data.user;

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img 
        variant="top" 
        src={user.avatarUrl || 'https://via.placeholder.com/150'}
        style={{ borderRadius: '50%', width: '150px', height: '150px', margin: 'auto' }} />
      <Card.Body>
        <Card.Title>{user.name || 'User Name'}</Card.Title>
        <Card.Subtitle>Followers: {user.followers || 0}</Card.Subtitle>
        <Card.Subtitle>Following: {user.following || 0}</Card.Subtitle>
        <Card.Text>
          {user.bio || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProfileCard;