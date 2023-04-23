import React, { useState } from 'react'
// import Userfront from "@userfront/core";
import Navigation from '../components/Nav';
import { useMutation } from '@apollo/client'
import { ADD_USER } from '../utils/mutations'
import {  Alert } from "react-bootstrap";
import Auth from '../utils/auth';
import "../styles/Signup.css";

// Initialize Userfront Core JS
// Userfront.init("demo1234");

// Define the Signup form component
const SignupForm = () =>
{
  const [userFormData, setUserFormData] = useState({
    email: "",
    username: "",
    password: ""
  });
  // set state for form validation
  // const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleInputChange = (event) =>
  {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) =>
  {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false)
    {
      event.preventDefault();
      event.stopPropagation();
    }

    try
    {
      const { data } = await addUser({
        variables: { ...userFormData },
      });

      Auth.login(data.addUser.token);
    } catch (err)
    {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: "",
      email: "",
      password: ""
    });
  };
 
  
    return (
      <div>
      <Navigation />
      <div className='divvy'>
      {/* <Alert
      show={showAlert} /> */}
          <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your login credentials!
        </Alert>
      <form  onSubmit={handleFormSubmit} className="signupForm">
        <label className='signupLabel'>
          Email address
          <input
            name="email"
            type="email"
            value={userFormData.email}
            onChange={handleInputChange}
            className="signupP"
          />
        </label>
        <label className='signupLabel'>
          Username
          <input
            name="username"
            type="text"
            value={userFormData.username}
            onChange={handleInputChange}
            className="signupP"
          />
        </label>
        <label className='signupLabel'>
          Password
          <input
            name="password"
            type="password"
            value={userFormData.password}
            onChange={handleInputChange}
            className="signupP"
          />
        </label>
  
        <button type="submit" className='signupBtns'>Sign up</button>
        {/* <SSOButton provider="google" /> */}
      </form>
      </div>

      {/* <p>or</p>

      <SSOButton provider="google" /> */}
    </div>
    );
  };


// Define the alert component
// class Alert extends React.Component {
//     // eslint-disable-next-line
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     if (!this.props.message) return "";
//     return <div id="alert">{this.props.message}</div>;
//   }
// }

// // Define the Single Sign-on (SSO) button
// class SSOButton extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleClick = this.handleClick.bind(this);
//   }

//   handleClick(event) {
//     Userfront.login({ method: this.props.provider });
//     event.preventDefault();
//   }

//   render() {
//     return (
//       <button onClick={this.handleClick} className="signupBtns">
//         Sign up with {this.props.provider}
//       </button>
//     );
//   }
// }

// Render the signup form
export default SignupForm;