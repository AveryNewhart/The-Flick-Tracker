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
      <h2 className='h2Text'>Join Flick Tracker today and start exploring the world of movies like never before.</h2>
      </div>
      <div className='theMessage'>
        <p className='homepageText'>Are you tired of scrolling endlessly through streaming platforms searching for your next movie to watch? 
          Look no further than Flick Tracker - the ultimate movie review website. With Flick Tracker, you can save movies to 
          your "watched" and "watchlist" sections, keeping track of all the films you've seen and ones you're excited to watch. 
          But that's not all - Flick Tracker also allows you to follow other users and see what movies they've added to their lists. 
          You can even post your own reviews and ratings, sharing your thoughts with the Flick Tracker community.</p>
        {/* <br></br>
        <p>dlkjhbdkjncljkdncjklsdncljdkncljkdnckljsncdlkjsdncljkdsncdsjklncdskjlnckdj</p>
        <br></br>
        <p>dlkjhbdkjncljkdncjklsdncljdkncljkdnckljsncdlkjsdncljkdsncdsjklncdskjlnckdj</p>
        <br></br> */}

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
