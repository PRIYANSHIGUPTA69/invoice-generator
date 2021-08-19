import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import './editSettings.css'
import Header from '../header/Header';

// Component
function EditSetting() {
  return (
   <div className="editSettings">
       <Header title="Edit Settiings"></Header>
   
      <div className="default-settings">
        <h2>Default Invoice Settings</h2>
        <Grid container spacing={2} justify="center" alignItems="center">
          <Grid item xs={12} md={4}>
            <div className="textfield-container">
              <TextField
                label="Company Name"
                name="companyName"
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className="textfield-container">
              <TextField
                label="GST Number"
                name="gstNumber"
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className="textfield-container">
              <TextField
                label="Company Address"
                name="companyAddress"
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </div>
          </Grid>

          <Grid item xs={12} md={4}>
            <div className="textfield-container">
              <p className="invoice-title">Currency</p>
              <div id="group2" className="radio-group">
                <div className="radioInput">
                  <input
                    type="radio"
                    value="inr"
                    id="inr"
                    name="currency"
                  />
                  <label htmlFor="inr">INR</label>
                </div>
                <div className="radioInput">
                  <input
                    type="radio"
                    value="usd"
                    id="usd"
                    name="currency"
                  />
                  <label htmlFor="usd">USD</label>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className="textfield-container">
              <p className="invoice-title">What Are You Selling?</p>
              <div id="group1" className="radio-group">
                <div className="radioInput">
                  <input
                    type="radio"
                    value="product"
                    id="product"
                    name="billableType"
                  />
                  <label htmlFor="product">Product</label>
                </div>
                <div className="radioInput">
                  <input
                    type="radio"
                    value="service"
                    id="service"
                    name="billableType"
                  />
                  <label htmlFor="service">Service</label>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={12} lg={4}>
            <div className="textfield-container">
              <p className="invoice-title">Default Invoice Note</p>
              <TextField
                label="Note for Customer"
                name="note"
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </div>
          </Grid>

          <Grid item xs={12} md={12} lg={4}>
            <div className="textfield-container">
              <p className="invoice-title">Enable Tax?</p>
              <div id="group1" className="radio-group">
                <div className="radioInput">
                  <input
                    type="radio"
                    value={true}
                    id="taxTrue"
                    name="taxEnable"
                  />
                  <label htmlFor="taxTrue">Yes</label>
                </div>
                <div className="radioInput">
                  <input
                    type="radio"
                    value={false}
                    id="taxFalse"
                    name="taxEnable"
                  />
                  <label htmlFor="taxFalse">No</label>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={12} lg={4}>
            <div className="textfield-container">
              <p className="invoice-title">Tax Type</p>
              <div id="group2" className="radio-group">
                <div className="radioInput">
                  <input
                    type="radio"
                    value="exc"
                    id="taxTypeExc"
                    name="taxType"
                  />
                  <label htmlFor="taxTypeExc">Exclusive</label>
                </div>
                <div className="radioInput">
                  <input
                    type="radio"
                    value="inc"
                    id="taxTypeInc"
                    name="taxType"
                  />
                  <label htmlFor="taxTypeInc">Inclusive</label>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={12} lg={4}>
            <div className="textfield-container">
              <p className="invoice-title">Tax Percent</p>

              <TextField
                label="Tax %"
                name="taxPercent"
                size="small"
                type="number"
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </div>
          </Grid>
        </Grid>
        <button className="flatButton" as={Link} to={'/settings'} >
          Go Back
        </button>
        <button
          className="secondaryButton"
        >
          Save 
        </button>
      </div>
      </div>
  );
}

export default EditSetting;
