import { Grid } from "@material-ui/core";
import React from "react";
import Header from "../Components/header/Header";
import TextField from "@material-ui/core/TextField";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import "./createInvoice.css";
import AddItem from "./AddItem";
import ProductList from "./ProductList";
function CreateInvoice() {
  return (
    <div className="create-invoice">
      <Header title="Create invoice"></Header>
      <div className="invoice-container">
        <Grid
          container
          justify="center"
          alignItems="center"
          className="invoice-details"
          spacing={2}
        >
          <Grid item xs={12} sm={6} md={6} lg={4}>
            <div className="textfield-container">
              <p className="invoice-title">Your Details</p>
              <TextField
                label="Company Name"
                name="companyName"
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              />
              <TextField
                label="GST Number"
                name="gstNumber"
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              />
              <TextField
                label="Address"
                name="companyAddress"
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={4}>
            <div className="textfield-container">
              <p className="invoice-title">Customer Details</p>

              <TextField
                label="Customer Name"
                name="customerName"
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              />
              <TextField
                label="Address"
                name="customerAddress"
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              />
              <TextField
                label="Email"
                name="email"
                size="small"
                type="email"
                required
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={4}>
            <div className="textfield-container">
              <p className="invoice-title">Invoice Details</p>

              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                  margin="dense"
                  id="date-picker-dialog"
                  label="Date"
                  name="Date"
                  size="small"
                  fullWidth
                  inputVariant="outlined"
                  format="DD/MM/YYYY"
                />
                <KeyboardDatePicker
                  margin="dense"
                  id="due-date-picker-dialog"
                  label="Due Date"
                  name="Due Date"
                  size="small"
                  fullWidth
                  inputVariant="outlined"
                  format="DD/MM/YYYY"
                />
              </MuiPickersUtilsProvider>
              <TextField
                label="# Invoice Number"
                name="invoiceNumber"
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={12}>
          <Grid
              container
              justify="center"
              alignItems="center"
              className="invoice-details"
            >
              <Grid item xs={12} md={12} lg={4}>
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
              <Grid item xs={12} md={12} lg={4}>
                <div className="textfield-container">
                  <p className="invoice-title">Notes for Customer</p>

                  <TextField
                    label="Note"
                    name="note"
                    size="small"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
          <Grid
              container
              justify="center"
              alignItems="center"
              className="invoice-details"
            >
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
                    <div className = "radioInput">
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
          </Grid>
          </Grid>
       <ProductList></ProductList>
      </div>
    </div>
  );
}

export default CreateInvoice;
