import React, { useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { Link } from 'react-router-dom';
import { QUERY_USER } from "../utils/queries";

const styles = {
  userSearch: {
    margin: '2rem'
  },
  btnStyles: {
    margin: '1rem',
    backgroundColor: "#c10206",
    color: "white",
    padding: "10px 20px",
    borderRadius: 5,
    borderStyle: "none",
    textDecoration: "none",
    display: "inline-block",
  }
}

const fetchUsers = (text) => {
  // Fetch users with usernames matching text.
  return fetch(
    `/api/users?username=${text}`
  ).then((res) => res.json());
};

const InputContainer = ({ handleChange, users }) => {
  return (
    <div className="input-container">
      <input
        className="search-field"
        type="search"
        onKeyUp={handleChange}
        list="users"
        placeholder="Search for a user..."
      />
      {users.length > 0 && (
        <datalist id="users">
          {users.map((user) => (
            <option key={user.id} value={user.username} />
          ))}
        </datalist>
      )}
    </div>
  );
};

const UserSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [searchUsers, { loading, data, error }] = useLazyQuery(QUERY_USER);

  const handleSearch = (e) => {
    e.preventDefault();
    searchUsers({ variables: { username: searchTerm } });
  };

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value) {
      const users = await fetchUsers(value);
      setUsers(users);
    } else {
      setUsers([]);
    }
  };

  return (
    <div style={styles.userSearch}>
      <form onSubmit={handleSearch}>
        <InputContainer handleChange={handleInputChange} users={users} />
        <button style={styles.btnStyles} type="submit">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && data.user && (
        <ul>
        <li key={data.user.id}>
          <p style={{ fontWeight: "bold", marginBottom: 5 }}>
            Username: {data.user.username}
          </p>
          <Link
            to={`/user/${data.user.username}`}
            style={{
              backgroundColor: "#c10206",
              color: "white",
              padding: "10px 20px",
              borderRadius: 5,
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            View Profile
          </Link>
        </li>
      </ul>
      )}
      {data && !data.user && <p>No results found.</p>}
    </div>
  );
};

export default UserSearch;

// Other Version

// import React from 'react';
// import { Link } from 'react-router-dom';
// import "../styles/Searchbar.css";

// const fetchUsers = (text) => {
//   // Fetch users with usernames matching text.
//   return fetch(
//     `/api/users?username=${text}`
//   ).then((res) => res.json());
// };

// const InputContainer = ({ handleChange }) => {
//   return (
//     <div className="input-container">
//       <input
//         className="search-field"
//         type="search"
//         onKeyUp={handleChange}
//         list="users"
//         placeholder="Search for a user..."
//       />
//     </div>
//   );
// };

// const User = ({ user }) => {
//   return (
//     <div className="user">
//       <img
//         className="user__avatar"
//         alt=''
//         src={user.avatar}
//         style={{
//           width: "35%",
//           float: "left"
//         }}
//       />
//       <div className="user__details" style={{ width: "60%", float: "right" }}>
//         <div className="details__header">
//           <div className="header-container">
//             <div className="user-username">{user.username}</div>
//           </div>
//           <div className="name-container">
//             <div className="user-name">{user.name}</div>
//           </div>
//         </div>
//         <div className="bio">
//           <h4 className="bio__header">Bio</h4>
//           <p className="details__bio">{user.bio}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// class Main extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       value: "",
//       users: [],
//       user: {},
//       showDropdown: false
//     };
//     this.findUser = this.findUser.bind(this);
//   }
  
//   handleChange = (event) => {
//     this.setState({ value: event.target.value, showDropdown: true });
//     // Search for users.
//     fetchUsers(this.state.value).then((data) => {
//       this.setState({ users: data.results });
//     });
//   };

//   findUser = (id) => {
//     const user = this.state.users.find((user) => user.userId === id);
//     this.setState({ user, showDropdown: false });
//     this.props.history.push(`/user/${id}`);
//   };

//   render() {
//     const { user, users } = this.state;
//     const userSelected = Object.getOwnPropertyNames(user).length !== 0;

//     return (
//       <div className="mainSearchDiv">
//         <InputContainer handleChange={this.handleChange} />
//         <div
//           className="users"
//           id="dropdown"
//           style={{ display: this.state.showDropdown ? "inherit" : "none" }}
//         >
//           {users
//             ? users.slice(0, 10).map((user) => {
//                 return (
//                   <Link
//                     key={user.id}
//                     className="option"
//                     to={`/user/${user.id}`}
//                     onClick={(event) => this.findUser(user.id, event)}
//                   >
//                     {`${user.username}`}
//                   </Link>
//                 );
//               })
//             : ""}
//         </div>
//         {userSelected && <User user={user} />}
//       </div>
//     );
//   }
// }

// export default Main;