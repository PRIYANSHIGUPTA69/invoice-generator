import { Icon } from "@material-ui/core";
import React from "react";
import { NavLink } from "react-router-dom";
import "./navlink.css";
function Navlink(props) {
  const {Icon, name, color, to } = props;
  var stylingObject = {
    color: {
      fontSize:"1rem",
      fontWeight:"bold"
    },
    paraColor : {color}
  };

  return (
   
      <NavLink
      className="navlink"
      exact
      to="/"
      color={color}
      to={to}
     
    >
      <div style={stylingObject.display}>
      <span style={stylingObject.paraColor}>
       <Icon/>
      </span>
      <p style={stylingObject.paraColor}>{name} </p>
      </div>
      
    </NavLink>
  
    
  );
}

export default Navlink;
