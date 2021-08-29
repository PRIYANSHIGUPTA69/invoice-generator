import React , {useState , useEffect} from 'react'
import moment from 'moment';
import { useParams } from 'react-router-dom';
import "./data.css"
import { getFirebase } from 'react-redux-firebase';
import { useSelector, useDispatch } from 'react-redux';
export default function InvoiceData(props) {
  const paidstatus = props.paidStatus
  const {
       companyName,
        gstNumber,
        companyAddress,
        customerName,
        customerAddress,
        email,
        invoiceDate,
        dueDate,
        invoiceNum,
        currency,
        note,
        taxEnable,
        taxType,
        taxPercent,
        items,
        totalAmount,
        totalExclusiveTax,
        totalInclusiveTax,
        totalWithExclusiveTax,
        paidStatus,
        billableType
      } = props.invo;
     console.log(props.invo)
      const currencySign = currency === 'usd' ? '$' : '₹';
      const itemList = items.map(({ itemName, rate, qty, disc, amount, id }, i) => (
        <div className="billRow" key={id}>
          <div className="billDataNum" style={{textAlign:"left"}}>{i + 1}</div>
          <p style={{padding: "0 5px"}}>{itemName}</p>
          <div className="billDataNum">{rate.toFixed(2)}</div>
          <div className="billDataNum">{disc}%</div>
          <div className="billDataNum">{qty}</div>
          <div className="billDataNum">{amount.toFixed(2)}</div>
        </div>
      ));
    return (
        <div className="billDocument" id="billDocuments">
        <div className="billPage">
          <div className="billDetails">
            <div className="billColumn">
              <h2>{companyName}</h2>
              <p style={{ fontWeight: 600 , marginLeft:"-.8rem" }}>{companyAddress}</p>
              <div className="invoiceNumber">{gstNumber && `GSTIN: ${gstNumber}`}</div>
              <div className="date" style={{marginLeft: "-1rem"}}>
              <p>
                Invoice Date :{' '}
                {moment(invoiceDate.toDate()).format('DD-MM-YYYY')}
              </p>
              <p>Due Date : {moment(dueDate.toDate()).format('DD-MM-YYYY')}</p>
              <p>
                Status :{' '}
                {paidstatus ? (
                  <span style={{ color: '#219735' }}>Fulfilled</span>
                ) : (
                  <span style={{ color: '#FD5665' }}>Pending</span>
                )}
              </p>
              </div>
            </div>
  
            <div className="billColumn" style={{ textAlign: 'right' }}>
              <div className="invoiceHeading">INVOICE</div>
              <div className="invoiceNumber"># Inv/{invoiceNum}</div>
              <p style={{padding:"0"}}>Bill To</p>
              <h2>{customerName}</h2>
              <p>{customerAddress}</p>
              <p style={{fontWeight:700 ,    padding: "0px"}}> Email : {email}</p>
            </div>
          </div>
          <div className="billHead">
            <div className="billDataNum" style={{textAlign:"left"}}>#</div>
            <p className="billDataNum">{billableType === 'product' ? 'Product Details' : 'Desription'}</p>
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
                  {taxType === 'exc' && <p>  GST {taxPercent}% : </p>}
  
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
                    {totalAmount.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                  </p>
                  {taxEnable === 'true' && taxType === 'exc' && (
                    <>
                     <p>
                     {currencySign}{' '}
                     {totalExclusiveTax.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                     </p>
                     <p>
                      {currencySign}{' '}
                      {totalWithExclusiveTax.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </p>
                    </>
                  )}
                  {taxEnable === 'true' && taxType === 'inc' && (
                    <>
                       <p>
                      {currencySign}{' '}
                      {totalAmount.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </p>

                    <p>
                      {currencySign}{' '}
                      {totalInclusiveTax.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </p>
                    </>
                  )}
                  {taxEnable === 'false' && (
                    <p>
                      {currencySign}{' '}
                      {totalAmount.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
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
