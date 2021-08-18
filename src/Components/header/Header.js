import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { AppBar } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./header.css";
function Header({ title }) {
  return (
    <div>
      <nav className="appbar">
        <h2 style={{textDecoration:"none" ,fontSize:"2rem" , color:"black"}}>{title}</h2>
        <div>
          <Link to="/settings" style={{textDecoration:"none" ,fontSize:"2rem" , color:"black"}}>Priyanshi gupta</Link>
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
          >
            <MoreVertIcon  style={{textDecoration:"none" ,fontSize:"2rem" , color:"black"}} />
          </IconButton>
          <Menu id="long-menu">
            <MenuItem>
              <p>Logout</p>
            </MenuItem>
          </Menu>
        </div>
      </nav>
    </div>
  );
}

export default Header;
