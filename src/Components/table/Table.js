import React from 'react'
import './table.css'
import moment from 'moment';
import {Link} from "react-router-dom"
function Table(props) {
  const invoices = props.invoice
  const dashboard = props.hasOwnProperty("dashboard")?true:false
  let i=0;
    return (
        <table className='table'>
      <tr className="table-head">
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
          <Link to = {`/invoice/${invoice.id}`} > 
          <tr>
          <td>{i}</td>
          <td>{moment(invoice.data.invoiceDate.toDate()).format('DD-MM-YYYY')}</td>
          <td>{invoice.data.customerName}</td>
          <td>{invoice.data.totalAmount}</td>
          <td>{invoice.data.paidStatus == false? "Pending" : "Paid"}</td>
        
        </tr>
        </Link>
        )
      }
    }else{
      return (
        <Link to = {`/invoice/${invoice.id}`} > 
          <tr>
          <td>{i}</td>
          <td>{moment(invoice.invoiceDate.toDate()).format('DD-MM-YYYY')}</td>
          <td>{invoice.customerName}</td>
          <td>{invoice.totalAmount}</td>
          <td>{invoice.paidStatus == false? "Pending" : "Paid"}</td>
        
        </tr>
        </Link>
      )
    }
   
  })}

 
</table>
    )
}

export default Table
