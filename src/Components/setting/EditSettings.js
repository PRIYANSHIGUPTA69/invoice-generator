import React , {useState , useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import './editSettings.css'
import Header from '../header/Header';
import { useSelector, useDispatch } from 'react-redux';
import { getFirebase } from 'react-redux-firebase';

import { updateSetting } from '../../redux/actions/authAction';
import { confirmSettingSaveAction } from '../../redux/actions/alertDialogActions';
// Component
function EditSetting() {
  const dispatch = useDispatch();

  const [invoiceMeta, setInvoiceMeta] = useState({
    billableType: 'product',
    taxType: 'exc',
    taxEnable: 'true',
    currency: 'inr',
  });
  const handleInvoiceMeta = (e) => {
    setInvoiceMeta({ ...invoiceMeta, [e.target.name]: e.target.value });
  };
  const [form, setForm] = useState(
    {
      companyName:"",
      gstNumber:"",
      taxPercent:"",
      companyAddress:"",
      note:"",
    }
    
  );
  const [settings , setSetting] = useState()
  const auth = useSelector((state) => state.firebase.auth.uid);
  const firestore = getFirebase().firestore();

  useEffect(async () => {
    let inv = firestore.collection('users').get().then(snapshot => {
     let values = snapshot.docs.map(doc => {
       return doc.data()
     });
    if(values[0].settings != undefined){
      setSetting(values[0].settings)
    }
    })
    if(settings != undefined)
    setForm({
      companyName:settings.companyName,
      gstNumber:settings.gstNumber,
      taxPercent:settings.taxPercent,
      companyAddress:settings.companyAddress,
      note:settings.note,
    })
    
   }, [])
   if(settings == undefined || form == undefined){
     return (
       <p>Loading!!</p>
     )
   }
 const updateForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (metaData) => {
    const obj ={
      companyName: form.companyName,
      gstNumber:form.companyAddress,
      taxPercent:form.taxPercent,
      companyAddress:form.companyAddress,
      note:form.note,
      billableType: invoiceMeta.billableType,
      taxType: invoiceMeta.taxType,
      taxEnable: invoiceMeta.taxEnable,
      currency: invoiceMeta.currency,
    }
   dispatch(updateSetting(obj));
    
 
};
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
                value={form.companyName}
                onChange = {updateForm}
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
                value={form.gstNumber}
                onChange = {updateForm}
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
                value={form.companyAddress}
                onChange = {updateForm}
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
              <p className="invoice-title">Default Invoice Note</p>
              <TextField
                label="Note for Customer"
                name="note"
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
                value={form.note}
                onChange = {updateForm}
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
                    checked={invoiceMeta.taxEnable === 'true'}
                    onChange={handleInvoiceMeta}
                  />
                  <label htmlFor="taxTrue">Yes</label>
                </div>
                <div className="radioInput">
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
                onChange={updateForm}
              />
            </div>
          </Grid>
        </Grid>
        <button className="flatButton" as={Link} to={'/settings'} >
          Go Back
        </button>
        <button
          className="secondaryButton" onClick={handleSubmit}
        >
          Save 
        </button>
      </div>
      </div>
  );
}

export default EditSetting;
