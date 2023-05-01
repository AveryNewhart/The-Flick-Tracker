import React, { useState } from 'react'
import Navigation from "../components/Nav.js";
// import Userfront from "@userfront/core";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
// import {  Alert } from "react-bootstrap";
import Auth from "../utils/auth";

import "../styles/App.css";
import "../styles/Login.css";

// Initialize Userfront Core JS
// Userfront.init("demo1234");

// Define the Login form component
const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  // const [validated] = useState(false);
  // const [showAlert, setShowAlert] = useState(false);
  
  const [loginUser, { error, data }] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await loginUser({ variables: { ...userFormData } });

      Auth.login(data.loginUser.token);
      window.location.href = '/profile';
    } catch (err) {
      console.error(err);
      // setShowAlert(true);
    }

    setUserFormData({
      email: "",
      password: "",
    });
  };
  //   }).catch((error) => {
  //     this.setAlertMessage(error.message);
  //   });
  // }

  // setAlertMessage(message) {
  //   this.setState({ alertMessage: message });
  // }
 
    return (
      <div>
      <Navigation />
    {/* <Alert message={this.state.alertMessage} /> */}
    {/* <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your login credentials!
        </Alert> */}
    <div className='divvy'>
    <form onSubmit={handleFormSubmit} className="loginForm">
      <label className='loginLabel'>
        Email
        <input
          name="email"
          type="text"
          value={userFormData.email}
          onChange={handleInputChange}
          className="signupP"
        />
      </label>
      <label className='loginLabel'>
        Password
        <input
          name="password"
          type="password"
          value={userFormData.password}
          onChange={handleInputChange}
          className="signupP"
        />
      </label>
      <button type="submit" className='loginBtns'>Log in</button>
      {/* <SSOButton provider="google" /> */}
      <p className='margin-p'>or</p>
      <label className="labelC">
            <a href="/signup" className="createA">
              Create an Account
            </a>
          </label>
          
    </form>
    

    {/* <p>or</p> */}

    {/* <SSOButton provider="google" /> */}
    </div>
  </div>
    );
  }

// Define the alert component
// class Alert extends React.Component {
//   // eslint-disable-next-line
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
//       <button onClick={this.handleClick} className="loginBtns">
//         Log in with {this.props.provider}
//       </button>
//     );
//   }
// }

// Render the login form
export default LoginForm;