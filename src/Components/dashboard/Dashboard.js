import React from 'react';
//Vendor
import { Grid, Hidden } from '@material-ui/core';


// Custom
import Header from '../header/Header';
import "./dashboard.css"
import Invoice from '../Invoices/Invoice';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
// Component
function Dashboard() {
 

  return (
    <div className ="dashboard">
      <Header title={'Dashboard'} />
      <Grid container justify="center" align-items="center">
        <Grid item xs={12} sm={4} md={4}>
        <Invoice Icon={AddCircleOutlineIcon}
                type="Create"
                number={10}
                color="#00C1D4"></Invoice>
         
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
        <Invoice Icon={CheckCircleOutlineIcon}
                type="Fulfilled"
                number={10}
                color="#24B47E"></Invoice>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
        <Invoice Icon={AlarmOnIcon}
                type="Pending"
                number={10}
                color="#F03738"></Invoice>
        </Grid>
      </Grid>

      <Grid
        container
        justify="center"
        align-items="center"
        style={{ marginTop: '3rem', width: '100%' }}
      >
        <Grid item xs={12} md={12} lg={9}>
          RecentInvoices
        </Grid>
        <Hidden mdDown>
          <Grid item md={3} lg={3}>
            
          </Grid>
        </Hidden>
  </Grid>
    </div>
  );
}

export default Dashboard;
