import React from 'react'
import './table.css'
function Table() {
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
  <tr>
    <td>1</td>
    <td>jan 16</td>
    <td>Aman</td>
    <td>2000</td>
    <td>Pending</td>
  </tr>
 
</table>
    )
}

export default Table
