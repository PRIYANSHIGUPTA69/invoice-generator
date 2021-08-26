import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from 'react';
import Header from "../Components/header/Header";
import TextField from "@material-ui/core/TextField";
import { MuiPickersUtilsProvider, KeyboardDatePicker} from "@material-ui/pickers";
import { useForm } from 'react-hook-form';
import MomentUtils from "@date-io/moment";
import { isLoaded } from 'react-redux-firebase';
import { useSelector, useDispatch } from 'react-redux';
import "./createInvoice.css";
import AddItem from "./AddItem";
import { getFirebase } from 'react-redux-firebase';
import ProductList from "./ProductList";
import {createInvoice} from "../redux/actions/invoiceActions"
import CreatePageLoader from "./createPageLoader";
function CreateInvoice(props) {
   const dispatch = useDispatch();
  const [settings , setSetting] = useState()
  const [form, setForm] = useState(
    {
      companyName:"" ,
      companyAddress:"" ,
      gstNumber:"" , 
      customerName:"" , 
      customerAddress:" " , 
      email:"" , 
      invoiceNum:"",
      taxPercent: '18',
      note:"welocome" 
    }
  );
  const firestore = getFirebase().firestore();
       const updateFrom = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };


    const [invoiceMeta, setInvoiceMeta] = useState({
    invoiceDate: new Date(),
    dueDate: new Date(),
    billableType: 'product',
    taxType: 'exc',
    taxPercent: '18',
    taxEnable: 'true',
    currency: 'inr',
    companyAddress: '',
    companyName: '',
    gstNumber: ''
  });

  useEffect(() => {
    let inv = firestore.collection('users').get().then(snapshot => {
      let values = snapshot.docs.map(doc => {
        return doc.data()
      });
     if(values[0].settings != undefined){
       setSetting(values[0].settings)
     }
     })
    if (settings){
      setInvoiceMeta({
        ...invoiceMeta,
        currency: settings.currency,
        billableType: settings.billableType,
        taxType: settings.taxType,
        taxPercent: settings.taxPercent,
        taxEnable: settings.taxEnable,
        companyAddress: settings.companyAddress,
        companyName: settings.companyName,
        gstNumber: settings.gstNumber
      });

       setForm({
          companyAddress: settings.companyAddress,
          companyName: settings.companyName,
          gstNumber: settings.gstNumber,
          customerName:"" , 
          customerAddress:" " , 
          email:"" , 
          invoiceNum:"1",
          taxPercent: settings.taxPercent,
          note:settings.note
        }
      );
    }
    console.log("render")
  }, []);
console.log(settings)
 if(settings == undefined){
   return (
     <p>Loading!!</p>
   )
 }
  const handleInvoiceMeta = (e) => {
    setInvoiceMeta({ ...invoiceMeta, [e.target.name]: e.target.value });
  };
  const handleDueDateChange = (e) => {
    setInvoiceMeta({ ...invoiceMeta, dueDate: e._d });
  };
  const handleInvoiceDateChange = (e) => {
    setInvoiceMeta({ ...invoiceMeta, invoiceDate: e._d });
  };
    // Submiting Invoice Details
  const handleInvoiceSubmit = (metaData) => {
    
      const finalObj = {
        ...form,
        ...metaData,
        dueDate: invoiceMeta.dueDate,
        invoiceDate: invoiceMeta.invoiceDate,
        paidStatus: false,
        remindedAt: new Date()
      };
     dispatch(createInvoice(finalObj));
   
  };
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
                error={form.companyName == "" && true}
                value = {form.companyName}
                 required
                 onChange= {updateFrom}

              />
              <TextField
                label="GST Number"
                name="gstNumber"
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
                required
                error={form.gstNumber == "" && true}
                value={form.gstNumber}
                onChange= {updateFrom}
              />
              <TextField
                label="Address"
                name="companyAddress"
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
                value={form.companyAddress}
                error={form.companyAddress == "" && true}
                onChange= {updateFrom}
                required
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
              
               onChange= {updateFrom}
               required
               value={form.customerName}
               error={form.customerName == ""  && true}
              />
              <TextField
                label="Address"
                name="customerAddress"
                size="small"
                fullWidth
                variant="outlined"
                value={form.customerAddress}
                error={form.customerAddress == "" && true}
                onChange= {updateFrom}
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
                value={form.email}
                error={form.email == "" && true}
               
                onChange= {updateFrom}
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
                  value={invoiceMeta.invoiceDate}
                  onChange={handleInvoiceDateChange}
                  name="invoiceDate"
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}

              
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
                  value={invoiceMeta.dueDate}
                  onChange={handleDueDateChange}
                  name="dueDate"
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
              
                />
              </MuiPickersUtilsProvider>
              <TextField
                label="# Invoice Number"
                name="invoiceNumber"
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
                value={form.invoiceNum}
                onChange= {updateFrom}
                required
                error={form.invoiceNum == "" && true}
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
                        checked={invoiceMeta.billableType === 'product'}
                        onChange={handleInvoiceMeta}
                      
                      />
                      <label htmlFor="product">Product</label>
                    </div>
                    <div className="radioInput">
                      <input
                        type="radio"
                        value="service"
                        id="service"
                        name="billableType"
                        checked={invoiceMeta.billableType === 'service'}
                        onChange={handleInvoiceMeta}
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
                         onChange={handleInvoiceMeta}
                        checked={invoiceMeta.currency === 'inr'}
                      />
                      <label htmlFor="inr">INR</label>
                    </div>
                    <div className="radioInput">
                      <input
                        type="radio"
                        value="usd"
                        id="usd"
                        name="currency"
                         checked={invoiceMeta.currency === 'usd'}
                        onChange={handleInvoiceMeta}
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
                    value={form.note}
                    onChange= {updateFrom}

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
                        checked={invoiceMeta.taxEnable === 'true'}
                        onChange={handleInvoiceMeta}
                      />
                      <label htmlFor="taxTrue">Yes</label>
                    </div>
                    <div className = "radioInput">
                      <input
                          type="radio"
                        value={false}
                        id="taxFalse"
                        name="taxEnable"
                        checked={invoiceMeta.taxEnable === 'false'}
                        onChange={handleInvoiceMeta}
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
                            checked={invoiceMeta.taxType === 'exc'}
                            onChange={handleInvoiceMeta}
                          />
                          <label htmlFor="taxTypeExc">Exclusive</label>
                        </div>
                        <div className="radioInput">
                          <input
                            type="radio"
                            value="inc"
                            id="taxTypeInc"
                            name="taxType"
                            name="taxType"
                            checked={invoiceMeta.taxType === 'inc'}
                            onChange={handleInvoiceMeta}
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
                        value={form.taxPercent}
                        onChange= {updateFrom}
                      />
                    </div>
                  </Grid>
            </Grid>
          </Grid>
          </Grid>
       <ProductList   
           invoiceMeta={invoiceMeta}
          handleInvoiceSubmit={handleInvoiceSubmit}
       ></ProductList>
   
      </div>
    </div>
  );
}

export default CreateInvoice;