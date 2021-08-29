import React , {useState , useEffect} from "react";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import GetAppIcon from "@material-ui/icons/GetApp";
import PrintIcon from "@material-ui/icons/Print";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import Header from "../header/Header";
import "./invoiceDetails.css"
import InvoiceData from "./InvoiceData";
import InvoicePDF from "./InovicePDF"
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import {
  deleteInovice,
  updatePaymentStatus
} from '../../redux/actions/invoiceActions';
import { getFirebase } from 'react-redux-firebase';
export default function InvoiceDetails(props) {
  const auth = useSelector((state) => state.firebase.auth.uid);
 
  const { id } = useParams();
  const [pdfUrl, setPdfUrl] = useState();
  const [invoice , setInvoice] = useState()
  const [paidStatus , setStatus] = useState(false)
  const firestore = getFirebase().firestore();
  const dispatch = useDispatch();
  useEffect(async () => {
   let inv = firestore.collection('users').doc(auth).collection("invoices").get().then(snapshot => {
    let values = snapshot.docs.map(doc => {
      if(doc.id == id){
        setInvoice(doc.data())
        if(invoice){
          setStatus(invoice.paidStatus)
        }
        
      }
     return doc.data()
    });
    
   })
  }, invoice)
 if(invoice == undefined){
   return (
     <p>Loading!!</p>
   )
 }
  const handleDeleteInvoice = () => {
    dispatch((deleteInovice(id)));
  };

  const handlePaymentStatus = () => {
    setStatus(!invoice.paidStatus)
    dispatch(updatePaymentStatus(id, !invoice.paidStatus)); 
  };

  return (
    <div className="invoice-details">
      <Header title={"Invoice Details"} />
<InvoiceData invo = {invoice} id={id} paidStatus={paidStatus}></InvoiceData>
      <div className="ButtonDiv">
        <button className="Yellow"
        onClick={handlePaymentStatus}
         
          color="#fda734"
        >
        
              {invoice.paidStatus
                ?<> <CheckCircleOutlineIcon></CheckCircleOutlineIcon>   <span>Mark Paid</span></>
                :<><HelpOutlineIcon></HelpOutlineIcon>  <span>Mark Pending</span> </>
            }
        </button>

        <button className="primary"  >
          <PDFDownloadLink style={{display: "flex",margin: 0, fontSize:"20px" , backgroundColor: "rgb(103, 114, 229)" , textDecoration: "none",  color: "white"}} document={<InvoicePDF invoice={invoice} />} fileName={invoice.invoiceNumber}>
      {({ blob, url, loading, error }) => (<>  {!loading && setPdfUrl(url)} <GetAppIcon /> {' '} {loading ? 'Loading!..' : 'Download!'}</>)}
        </PDFDownloadLink>
      </button>

        <button className="secondary" onClick={() => {
          window.open(pdfUrl)
        
        }} >
          <PrintIcon></PrintIcon><span>Print</span>
         
        </button>
        <button className="danger" onClick={handleDeleteInvoice}>
          <DeleteOutlineIcon></DeleteOutlineIcon> <span>Delete</span>
        </button>
      </div>
    </div>
  );
}
