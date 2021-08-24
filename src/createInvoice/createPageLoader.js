import React from 'react';
import Header from "../Components/header/Header";
import Grid from '@material-ui/core/Grid';
import "./createPageLoader.css"
function CreatePageLoader() {
  return (
    <div>
      <Header title={'Add New Invoice'} />
      <div  className="InvoiceContainer">
        <h3>INVOICE</h3>
        <Grid
          container
          justify="center"
          alignItems="center"
          className="invoice-details"
          spacing={2}
        >
          <Grid item xs={12} sm={6} md={6} lg={4}>
            
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={4}>
            
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={4}>
            
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={4}>
            
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={4}>
            
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={4}>
            
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={4}>
            
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={4}>
            
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={4}>
           
          </Grid>
        </Grid>
        <Grid
          container
          justify="center"
          alignItems="center"
          className="invoice-details"
          spacing={2}
        >
         
        </Grid>
      </div>
    </div>
  );
}

export default CreatePageLoader;
