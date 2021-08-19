import React from 'react';
import { Grid, Hidden } from '@material-ui/core';
import {Link} from "react-router-dom"
import Header from '../header/Header';
import "./dashboard.css"
import InvoiceCard from "../dashboard invoices card/InvoiceCard"
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import Table from "../table/Table"
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
function Dashboard() {
 

  return (
    <div className ="dashboard">
      <Header title={'Dashboard'} />
      <Grid container justify="center" align-items="center">
        <Grid item xs={12} sm={4} md={4}>
        <InvoiceCard Icon={AddCircleOutlineIcon}
                type="Create"
                number={10}
                color="#00C1D4"/>
         
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
        <InvoiceCard Icon={CheckCircleOutlineIcon}
                type="Fulfilled"
                number={10}
                color="#24B47E"/>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
        <InvoiceCard Icon={AlarmOnIcon}
                type="Pending"
                number={10}
                color="#F03738"/>
        </Grid>
      </Grid>

      <Grid
        container
        justify="center"
        align-items="center"
        style={{ marginTop: '3rem', width: '100%' }}
      >
        <Grid item xs={12} md={12} lg={9}>
          <div className=
          'recent'>
            <h2>Recent Invoicces</h2>
            <Link>View Alll</Link>
          </div>
          <Table></Table>
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
