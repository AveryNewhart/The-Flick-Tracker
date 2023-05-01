import React, { useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { Link } from 'react-router-dom';
import { QUERY_USER } from "../utils/queries";

const UserSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchUsers, { loading, data, error }] = useLazyQuery(QUERY_USER);

  const handleSearch = (e) => {
    e.preventDefault();
    searchUsers({ variables: { username: searchTerm } });
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button type="submit">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && data.user && (
        <ul>
          <li key={data.user.id}>
            <p>Username: {data.user.username}</p>
            <p>Email: {data.user.email}</p>
            <Link to={`/profile/${data.user.username}`}>View Profile</Link>
          </li>
        </ul>
      )}
      {data && !data.user && <p>No results found.</p>}
    </div>
  );
};

export default UserSearch;