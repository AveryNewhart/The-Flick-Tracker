import React from 'react'
import Userfront from "@userfront/core";
import Navigation from '../components/Nav';

import "../styles/Signup.css";

// Initialize Userfront Core JS
Userfront.init("demo1234");

// Define the Signup form component
class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      accountName: "",
      password: "",
      passwordVerify: "",
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

  // Handle the form submission by calling Userfront.signup()
  handleSubmit(event) {
    event.preventDefault();
    // Reset the alert to empty
    this.setAlertMessage();
    // Verify that the passwords match
    if (this.state.password !== this.state.passwordVerify) {
      return this.setAlertMessage('Passwords must match');
    }
    // Call Userfront.signup()
    Userfront.signup({
      method: "password",
      email: this.state.email,
      password: this.state.password,
      data: {
        accountName: this.state.accountName
      }
    }).catch((error) => {
      this.setAlertMessage(error.message);
    });
  }

  setAlertMessage(message) {
    this.setState({ alertMessage: message });
  }
 
  render() {
    return (
      <div>
      <Navigation />
      <div className='divvy'>
      <Alert message={this.state.alertMessage} />
      <form onSubmit={this.handleSubmit} className="signupForm">
        <label className='signupLabel'>
          Email address
          <input
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.handleInputChange}
            className="signupI"
          />
        </label>
        <label className='signupLabel'>
          Account name (custom field)
          <input
            name="accountName"
            type="text"
            value={this.state.accountName}
            onChange={this.handleInputChange}
            className="signupI"
          />
        </label>
        <label className='signupLabel'>
          Password
          <input
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleInputChange}
            className="signupI"
          />
        </label>
        <label className='signupLabel'>
          Verify password
          <input
            name="passwordVerify"
            type="password"
            value={this.state.passwordVerify}
            onChange={this.handleInputChange}
            className='signupI'
          />
        </label>
        <button type="submit" className='signupBtns'>Sign up</button>
        <SSOButton provider="google" />
      </form>
      </div>

      {/* <p>or</p>

      <SSOButton provider="google" /> */}
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
      <button onClick={this.handleClick} className="signupBtns">
        Sign up with {this.props.provider}
      </button>
    );
  }
}

// Render the signup form
export default SignupForm;