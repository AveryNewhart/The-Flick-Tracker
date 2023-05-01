import React from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import { useQuery, gql } from '@apollo/client';

const styles = {
  cardStyles: {
    width: '18rem',
    padding: '0.5rem',
  }
}

const QUERY_USER = gql`
query Query($username: String!) {
    user(username: $username) {
      id
      username
      watchedMovies {
        title
        imageURL
        movieId
      }
      watchlist {
        movieId
        title
        imageURL
      }
      followings {
        username
        id
      }
      followers {
        id
        username
      }
    }
  }
`;

const UserCard = () => {
    const { username } = useParams();
    console.log(username);
  
    // Query user data
    const { loading, data } = useQuery(QUERY_USER, {
      variables: { username } ,
    });

    console.log(data);
  
    if (loading) return <p>Loading...</p>;
  
    const user = data?.user;
    console.log(user)
    if (!user) return <p>User not found</p>;
  
    return (
      <Card style={styles.cardStyles}>
        <Card.Body>
          <Card.Title>{user.username || 'User Name'}</Card.Title>
          <Card.Subtitle>Followers: {user.followers.length || 0}</Card.Subtitle>
          <Card.Subtitle>Following: {user.followings.length || 0}</Card.Subtitle>
        </Card.Body>
      </Card>
    );
};

export default UserCard;