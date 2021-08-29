import React from 'react'
import Logo from "../../images/logo.png"
import {Link} from "react-router-dom"
import Navlink from './Navlink'
import "./style.css"
import DashboardIcon from '@material-ui/icons/Dashboard';
import CreateIcon from '@material-ui/icons/Create';
import ReceiptIcon from '@material-ui/icons/Receipt';
import SettingsIcon from '@material-ui/icons/Settings';
export default function Sidebar() {
    return (
        <div className="sidebar">
        <Link to="/">
        <img className="image" src={Logo} alt="Logo" />
      </Link>
      <Navlink
        Icon={DashboardIcon}
        name={'Dashboard'}
        color={'#2E5BFF'}
        to="/"
      />
      <Navlink
        Icon={CreateIcon}
        name={'Create New'}
        color={'#00C1D4'}
        to="/create"
      />
      <Navlink
        Icon={ReceiptIcon}
        name={'Invoices'}
        color={'#FD5665'}
        to="/invoices"
      />
      <Navlink
        Icon={SettingsIcon}
        name={'Settings'}
        color={'#FDA734'}
        to="/settings"
      /> 
        </div>
    )
}
