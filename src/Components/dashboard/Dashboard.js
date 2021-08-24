import React  , {useState , useEffect} from 'react';
import { Grid, Hidden } from '@material-ui/core';
import {Link} from "react-router-dom"
import Header from '../header/Header';
import { useSelector , useDispatch } from 'react-redux';
import "./dashboard.css"
import InvoiceCard from "../dashboard invoices card/InvoiceCard"
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import Table from "../table/Table"
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Welcome from "../Welcome"
import {getFirebase} from "react-redux-firebase"
function Dashboard() {
  const auth = useSelector((state) => state.firebase.auth.uid);
  const [invoice , setInvoice] = useState()
  const firestore = getFirebase().firestore();
  const dispatch = useDispatch();
  useEffect(async () => {
    let inv = firestore.collection('users').doc(auth).collection("invoices").get().then(snapshot => {
     let values = snapshot.docs.map(doc => {
     
        return doc.data()
     });
    setInvoice(values)
     console.log(invoice)
    })
    
   }, [])
  if(invoice == undefined){
    console.log(invoice)
    return (
      <p>Loading!!</p>
    )
  }
 
  let paidInvoices , pendingInvoices
 paidInvoices = invoice.filter(invoice => {
   return invoice.paidStatus== true
 })
 pendingInvoices = invoice.filter(invoice => {
  return invoice.paidStatus== false
})
console.log(invoice , pendingInvoices , paidInvoices)


  return (
    <div className ="dashboard">
      <Header title={'Dashboard'} />
      <Grid container justify="center" align-items="center">
        <Grid item xs={12} sm={4} md={4}>
        <InvoiceCard Icon={AddCircleOutlineIcon}
                type="Create"
                number={invoice.length}
                color="#00C1D4"
                path="/create"
                />
         
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
        <InvoiceCard Icon={CheckCircleOutlineIcon}
                type="Fulfilled"
                path=""
                number={paidInvoices.length}
                color="#24B47E"/>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
        <InvoiceCard Icon={AlarmOnIcon}
                type="Pending"
                number={pendingInvoices.length}
                path = ""
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
