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
import {getFirebase} from "react-redux-firebase"
import Graph from '../graph/Graph';
import Welcome from '../Loaders/invoiceLoader/Welcome';
function Dashboard() {
  const auth = useSelector((state) => state.firebase.auth.uid);
  const [dataObj , setData] = useState()
  const [invoice , setInvoice] = useState()
  const firestore = getFirebase().firestore();
  const dispatch = useDispatch();
  useEffect(async () => {
    let inv = firestore.collection('users').doc(auth).collection("invoices").get().then(snapshot => {
     let values = snapshot.docs.map(doc => {
        let obj = {data:doc.data() , id:doc.id}
        console.log(obj)
        return obj
     });
     let invo = []
     for(let i=0; i<values.length ;i++){
       invo.push(values[i].data)
     }
     
    setInvoice(invo)
    setData(values)
     
    })
    
   }, [])
  if(invoice == undefined || dataObj == undefined || invoice.length ==0){
   
    return (
      <Welcome></Welcome>
    )
  }
  console.log(invoice ,  dataObj)
  let paidInvoices , pendingInvoices
 paidInvoices = invoice.filter(invoice => {
   return invoice.paidStatus== true
 })
 pendingInvoices = invoice.filter(invoice => {
  return invoice.paidStatus== false
})


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
         <Table invoice={dataObj} dashboard={true}></Table>
        </Grid>
        <Hidden mdDown>
          <Grid item md={3} lg={3}>
            <Graph paidInvoices={paidInvoices.length} pendingInvoices={pendingInvoices.length}></Graph>
          </Grid>
        </Hidden>
  </Grid>
    </div>
  );
}

export default Dashboard;
