import React from 'react'
import { Doughnut } from 'react-chartjs-2';

function Graph(props) {
    
    const chartData = {
        labels: ['Fulfilled Invoice', 'Pending Invoices'],
        datasets: [
          {
            label: 'Rahu',
            data: [props.paidInvoices, props.pendingInvoices],
            backgroundColor: ['#24B47E3a', '#F037383a'],
            borderColor: ['#24B47E', '#F03738'],
            borderWidth: 1
          }
        ]
      }
    return (
        <div className="garph">
             <h3>Summary</h3>
        <Doughnut data={chartData} width={500} height={500} />
        </div>
    )
}

export default Graph
