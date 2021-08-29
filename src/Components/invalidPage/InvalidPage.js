import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import NotFoundImg from '../../images/404.svg';
import "./invalidPage.css"
import {useHistory} from "react-router-dom"

function InvalidPage() {
  const history = useHistory()  
  return (
    <div className = "invalidPage">
      <div>
        <img src={NotFoundImg} alt="Not Found" />
        <button className="invalid-button" onClick= {(e) => {history.push("/")}}>
          Return Home
        </button>
      </div>
    </div>
  );
}

export default InvalidPage
