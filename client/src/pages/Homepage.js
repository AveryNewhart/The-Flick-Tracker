import React from 'react'
// import Navigation from "../components/Nav.js";
import ThePic from "../images/movietheatre.png";
import "../styles/App.css"
import "../styles/Homepage.css"
 
export default function Welcome() {
  return (
    <div className='make-big'>
      <img className='thePic' src={ ThePic } alt='' />
      <div className='theTitle'>
        <h1>Flick Tracker</h1>
      </div>
      <div className='theText'>
      <h2>Join a community of movie lovers on Flick Tracker</h2>
      </div>
      <div className='theMessage'>
        <p>dlkjhbdkjncljkdncjklsdncljdkncljkdnckljsncdlkjsdncljkdsncdsjklncdskjlnckdj</p>
        <br></br>
        <p>dlkjhbdkjncljkdncjklsdncljdkncljkdnckljsncdlkjsdncljkdsncdsjklncdskjlnckdj</p>
        <br></br>
        <p>dlkjhbdkjncljkdncjklsdncljdkncljkdnckljsncdlkjsdncljkdsncdsjklncdskjlnckdj</p>
        <br></br>

      </div>
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
