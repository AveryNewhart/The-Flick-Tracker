import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import { useQuery, useMutation, gql } from '@apollo/client';

const styles = {
  cardStyles: {
    width: '18rem',
    padding: '0.5rem',
  },
  btnStyles: {
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

const ADD_FOLLOWER = gql`
mutation addFollower($userId: ID!, $followedUserId: ID!) {
  addFollower(userId: $userId, followedUserId: $followedUserId) {
    id
  }
}
`;

const REMOVE_FOLLOWER = gql`
mutation removeFollower($userId: ID!, $followedUserId: ID!) {
  unfollow(userId: $userId, followedUserId: $followedUserId) {
    id
  }
}
`;

const UserCard = () => {
    const { username } = useParams();
  
    // Query user data
    const { loading, data } = useQuery(QUERY_USER, {
      variables: { username } ,
    });

    const [addFollower] = useMutation(ADD_FOLLOWER);
    const [removeFollower] = useMutation(REMOVE_FOLLOWER);

    const handleAddFollower = () => {
      addFollower({
        variables: {
          userId: data?.user?.id,
          followedUserId: "followedUserId", // replace with actual followed user ID
        },
      });
    };

    const handleRemoveFollower = () => {
      removeFollower({
        variables: {
          userId: data?.user?.id,
          followedUserId: "followedUserId", // replace with actual followed user ID
        },
      });
    };
  
    if (loading) return <p>Loading...</p>;
  
    const user = data?.user;
    if (!user) return <p>User not found</p>;

    const isFollowing = user.followers.some((follower) => follower.id === "currentUserId"); // replace with actual current user ID
  
    return (
        <Card style={styles.cardStyles}>
          <Card.Body>
            <Card.Title>{user.username || 'User Name'}</Card.Title>
            <Card.Subtitle>Followers: {user.followers.length || 0}</Card.Subtitle>
            <Card.Subtitle>Following: {user.followings.length || 0}</Card.Subtitle>
            {isFollowing ? (
              <Button variant="primary" style={styles.btnStyles} onClick={handleRemoveFollower}>Unfollow</Button>
            ) : (
              <Button variant="primary" style={styles.btnStyles} onClick={handleAddFollower}>Follow</Button>
            )}
          </Card.Body>
        </Card>
      );
  };
  
  export default UserCard;