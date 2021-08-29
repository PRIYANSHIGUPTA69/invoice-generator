import React from 'react'
import {Link } from 'react-router-dom'
import "./welcome.css"
import welcomeImg from "../../../images/welcome.png"
function Welcome() {
    return (
        <div className = "Loader">
             <div>
          <p className="p-tag">Welcome </p>
        <Link to="/create">
          <img src={welcomeImg} className="welcome-image" alt="Welcome " />
        </Link>
      </div>
        </div>
    )
}

export default Welcome
