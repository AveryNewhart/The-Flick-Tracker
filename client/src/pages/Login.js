import React from 'react'
import Navigation from "../components/Nav.js";
import Userfront from "@userfront/core";

import "../styles/App.css";
import "../styles/Login.css";

// Initialize Userfront Core JS
Userfront.init("demo1234");

// Define the Login form component
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailOrUsername: "",
      password: "",
      alertMessage: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setAlertMessage = this.setAlertMessage.bind(this);
  }

  // Whenever an input changes value, change the corresponding state variable
  handleInputChange(event) {
    event.preventDefault();
    const target = event.target;
    this.setState({
      [target.name]: target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    // Reset the alert to empty
    this.setAlertMessage();
    // Call Userfront.login()
    Userfront.login({
      method: "password",
      emailOrUsername: this.state.emailOrUsername,
      password: this.state.password
    }).catch((error) => {
      this.setAlertMessage(error.message);
    });
  }

  setAlertMessage(message) {
    this.setState({ alertMessage: message });
  }
 
  render() {
    return (
      <div className='divvy'>
        <div>
          <Navigation />
        </div>
        <Alert message={this.state.alertMessage} />
        <form onSubmit={this.handleSubmit} className="loginForm">
          <label className='loginLabel'>
            Email or username
            <input
              name="emailOrUsername"
              type="text"
              value={this.state.emailOrUsername}
              onChange={this.handleInputChange}
              className="loginI"
            />
          </label>
          <label className='loginLabel'>
            Password
            <input
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleInputChange}
              className="loginI"
            />
          </label>
          <button type="submit" className='loginBtns'>Log in</button>
          <label className="labelC">
                <a href="/signup" className="createA">
                  Create an Account
                </a>
              </label>
        </form>

        <p>or</p>

        <SSOButton provider="google" />
      </div>
    );
  }
}

// Define the alert component
class Alert extends React.Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }
  render() {
    if (!this.props.message) return "";
    return <div id="alert">{this.props.message}</div>;
  }
}

// Define the Single Sign-on (SSO) button
class SSOButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    Userfront.login({ method: this.props.provider });
    event.preventDefault();
  }

  render() {
    return (
      <button onClick={this.handleClick} className="loginBtns">
        Log in with {this.props.provider}
      </button>
    );
  }
}

// Render the login form
export default LoginForm;