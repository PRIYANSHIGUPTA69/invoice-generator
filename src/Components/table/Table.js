import React from 'react'
import './table.css'
import moment from 'moment';
function Table(props) {
  const invoices = props.invoice;
  let i=0;
  console.log(invoices)
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
    return (
      <tr>
      <td>{i}</td>
      <td>{moment(invoice.invoiceDate.toDate()).format('DD-MM-YYYY')}</td>
      <td>{invoice.customerName}</td>
      <td>{invoice.totalAmount}</td>
      <td>{invoice.paidStatus == false? "Pending" : "Paid"}</td>
    </tr>
    )
  })}

 
</table>
    )
}

export default Table
