     
import React from 'react';
import Header from '../header/Header';
import Grid from '@material-ui/core/Grid';
import "./settings.css"
import { Button } from '@material-ui/core';
import {Link} from 'react-router-dom'
// Component
function Settings() {
  return (
    <div className="setting">
      <Header title={'Settings'} />
      <div>
        <div >
      <div className="name-photo">
      <div>
        <img
          src={`https://ui-avatars.com/api/?name="Priya"+"Gupta"&size=80&rounded=true&color=2e5bff&background=e0e7ff`}
          alt="User Logo"
        />
      </div>
      <p>
        Priyanshi
      </p>
    </div>
   
      </div>
      <div className="default-settings">
        <h3>Default Settings</h3>
        <Grid container justify="center" spacing={2}>
          <Grid item xs={12} md={4}>
            <p>
              <span>Company Name: </span>
             
            </p>
            <p>
              <span>GSTIN: </span>
              
            </p>
            <p>
              <span>Company Address: </span>
             
            </p>
          </Grid>
          <Grid item xs={12} md={4}>
            <p>
              <span>Billable Type: </span>
             
            </p>
            <p>
              <span>Default Currency: </span>
              
            </p>
            <p>
              <span>Default Customer Note: </span> 
            </p>
          </Grid>
          <Grid item xs={12} md={4}>
            <p>
              <span>Enable Tax: </span>
             
            </p>
            <p>
              <span>Default Tax Type: </span>
             
            </p>
            <p>
              <span>Default Tax Percent: </span> 
            </p>
          </Grid>
        </Grid>
        
      </div>
      <button className="edit" as={Link} to={'/settings/edit'}>
          EDIT SETTINGS
        </button>
      </div>
    </div>
  );
}

export default Settings;
