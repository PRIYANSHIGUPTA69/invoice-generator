import React from 'react'
import './table.css'
import moment from 'moment';
import {Link} from "react-router-dom"
import {useHistory} from "react-router-dom"
import NothingHere from '../Loaders/invoiceLoader/NothingHere';
function Table(props) {
  const invoices = props.invoice
  const history  = useHistory()
  const dashboard = props.hasOwnProperty("dashboard")?true:false
  console.log(invoices)
  let i=0;
  if(invoices.length == 0){
    return (
      <NothingHere></NothingHere>
    )
  }
    return (
        <table className='table'>
      <tr className="table-head" >
      <th className="number">No.</th>
        <th className="date">Date</th>
        <th className="name">Name</th>
        <th className="amount">Amount</th>
        <th className="status">Status</th>
        <th className="option"></th>
  </tr>
  {invoices.map(invoice => {
    i++
    if(dashboard === true){
      if(i < 5){
        return (
         
          <tr  onClick={() => history.push(`/invoice/${invoice.id}`) } style={{textAlign:"center"}}>
            
          <td className="number">{i}</td>
          <td className="date">{moment(invoice.data.invoiceDate.toDate()).format('DD-MM-YYYY')}</td>
          <td className="name">{invoice.data.customerName}</td>
          <td className="amount">{invoice.data.totalAmount}</td>
          <td className="status">{invoice.data.paidStatus == false? "Pending" : "Paid"}</td>
         
        </tr>
       
        )
      }
    }else{
      return (
       
          <tr onClick={() => window.location=`/invoice/${invoice.id}`} style={{textAlign:"center"}}>
          <td className="number">{i}</td>
          <td className="date">{moment(invoice.data.invoiceDate.toDate()).format('DD-MM-YYYY')}</td>
          <td className="name">{invoice.data.customerName}</td>
          <td className="amount">{invoice.data.totalAmount}</td>
          <td className="status">{invoice.data.paidStatus == false? "Pending" : "Paid"}</td>
        
        </tr>
        
      )
    }
   
  })}

 
</table>
    )
}

export default Table
