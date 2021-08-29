import React from 'react';
import Logo from '../../../images/logo.png';
import "./appLoader.css"


function AppLoader() {
  return (
    <div className="appLoader">
      <div>
        <img src={Logo} className="logo-image" alt="Logo" />
        <p></p>
      </div>
    </div>
  );
}

export default AppLoader;
