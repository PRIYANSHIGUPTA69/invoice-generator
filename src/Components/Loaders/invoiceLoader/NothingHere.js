import React from 'react';
import nothing from '../../../images/nothing.svg';
import { Link } from 'react-router-dom';
import "./nothingHere.css"
function NothingHere() {
  return (
    <div className="nothing-laoder">
      <div>
        <Link to="/create">
          <img src={nothing} className="craete-img" alt="Nothing Here Yet" />
        </Link>
      </div>
    </div>
  );
}

export default NothingHere;
