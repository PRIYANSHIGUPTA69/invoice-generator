import { Icon } from "@material-ui/core";
import React from "react";
import { NavLink } from "react-router-dom";
import "./navlink.css";
function Navlink(props) {
  const {Icon, name, color, to } = props;
  var stylingObject = {
    color: {
      color: `${color}`,
      fontSize:"1rem",
      fontWeight:"bold"
    },
    hover: {
      boxShadow: `3px 3px 12px ${color}`,

      
    },
  };
  const onHover = (e) => {
    e.target.style.boxShadow = `3px 3px 12px ${color}`;

    e.target.style.borderRadius="120px"
  };
  return (
    <NavLink
      className="navlink"
      exact
      to="/"
      color={color}
      to={to}
      onMouseEnter={onHover}
      onMouseLeave={(e) => (e.target.style.boxShadow = "none")}
    >
      <div style={stylingObject.display}>
      <span style={stylingObject.color}>
       <Icon/>
      </span>
      <p style={stylingObject.color}>{name} </p>
      </div>
      
    </NavLink>
  );
}

export default Navlink;
