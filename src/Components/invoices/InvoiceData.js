import React from 'react'
import moment from 'moment';
import "./data.css"
export default function InvoiceData(props) {
    let companyName = "usthaan", gstNumber="10", companyAddress="mumbai",  customerName="abc gupta", customerAddress ="abc"
   let email = "abc@gmail.com" , invoiceNumber=10, currency="IND", note="welcome" 
    const {
       /* companyName,
        gstNumber,
        companyAddress,
        customerName,
        customerAddress,
        email,
        invoiceDate,
        dueDate,
        invoiceNumber,
        currency,
        note,*/
        taxEnable,
        taxType,
        taxPercent,
       
        totalAmount,
        totalExclusiveTax,
        totalInclusiveTax,
        totalWithExclusiveTax,
        paidStatus,
        billableType
      } = props;
      const currencySign = currency === 'usd' ? '$' : '₹';
      const items = [{ itemName:"pen", rate:10, qty:2, disc:4, amount:20, id:2 }]
      const itemList = items.map(({ itemName, rate, qty, disc, amount, id }, i) => (
        <div className="billRow" key={id}>
          <div className="billDataNum">{i + 1}</div>
          <p>{itemName}</p>
          <div className="billDataNum">{rate.toFixed(2)}</div>
          <div className="billDataNum">{disc}%</div>
          <div className="billDataNum">{qty}</div>
          <div className="billDataNum">{amount.toFixed(2)}</div>
        </div>
      ));
    return (
        <div className="billDocument">
        <div className="billPage">
          <div className="billDetails">
            <div className="billColumn">
              <h2>{companyName}</h2>
              <p>{companyAddress}</p>
              <div className="invoiceNumber">{gstNumber && `GSTIN: ${gstNumber}`}</div>
              <div className="date">
               {/*} <p>
                  Invoice Date :{' '}
                  {/*moment(invoiceDate.toDate()).format('DD-MM-YYYY')}
    </p>
                <p>Due Date : {/moment(dueDate.toDate()).format('DD-MM-YYYY')}</p>*/}
                <p>
                  Status :{' '}
                  {paidStatus ? (
                    <span style={{ color: '#219735' }}>Fulfilled</span>
                  ) : (
                    <span style={{ color: '#FD5665' }}>Pending</span>
                  )}
                </p>
              </div>
            </div>
  
            <div className="billColumn" style={{ textAlign: 'right' }}>
              <div className="invoiceHeading">INVOICE</div>
              <div className="invoiceNumber"># Inv/{invoiceNumber}</div>
              <p>Bill To</p>
              <h2>{customerName}</h2>
              <p>{customerAddress}</p>
              <p>Email : {email}</p>
            </div>
          </div>
          <div className="billHead">
            <div className="billDataNum">#</div>
            <p>{billableType === 'product' ? 'Product Details' : 'Desription'}</p>
            <div className="billDataNum">Rate</div>
            <div className="billDataNum">Disc</div>
            <div className="billDataNum">Qty</div>
            <div className="billDataNum">Amount</div>
          </div>
          {itemList}
          <div className="billDetails">
            <div className="billColumn">{note && <div className="date" >Note: {note}</div>}</div>
            <div className="billColumn">
              <div className="billDetails">
                <div className="billColumn" style={{ textAlign: 'right' }}>
                  <p>Sub Total: </p>
                  {taxType === 'exc' && <p> GST {taxPercent}% : </p>}
  
                  <p>Total: </p>
  
                  {taxEnable === 'true' && taxType === 'inc' && (
                    <p style={{ marginLeft: '-50%' }}>
                      Includes GST {taxPercent}%:{' '}
                    </p>
                  )}
                </div>
                <div className="billColumn" style={{ textAlign: 'right' }}>
                  <p>
                    {currencySign}{' '}
                   
                  </p>
                  {taxEnable === 'true' && taxType === 'exc' && (
                    <>
                     
                    </>
                  )}
                  {taxEnable === 'true' && taxType === 'inc' && (
                    <>
                      <p>
                        {currencySign}{' '}
                      </p>
  
                      <p>
                        {currencySign}{' '}
                      </p>
                    </>
                  )}
                  {taxEnable === 'false' && (
                    <p>
                      {currencySign}{' '}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}
