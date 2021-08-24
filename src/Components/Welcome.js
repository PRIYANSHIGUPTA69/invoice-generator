import React from 'react'
import {Link } from 'react-router-dom'
import "./welcome.css"
import welcomeImg from "../images/welcome.svg"
function Welcome() {
    return (
        <div className = "Loader">
             <div>
        <Link to="/create">
          <img src={welcomeImg} alt="Welcome to Billy" />
        </Link>
      </div>
        </div>
    )
}

export default Welcome
