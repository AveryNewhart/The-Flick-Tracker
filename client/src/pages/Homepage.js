import React from 'react'
// import Navigation from "../components/Nav.js";
import ThePic from "../images/movietheatre.png";
import "../styles/App.css"

export default function Welcome() {
  return (
    <div className='make-big'>
        {/* eslint-disable-next-line */}
      <img className='thePic' src={ ThePic } />
      <div className='welcome-head'>
        <label className="loginL">
          <a href="/login" className="loginA">
              Login/Create
          </a>
        </label>
        </div>
    </div>
  )
}
