import React , {useState , useEffect} from "react";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import SendIcon from "@material-ui/icons/Send";
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
// Custom
import {
  confirmDeleteAction,
  confirmEmailReminder,
  confirmPaymentChangeAction
} from '../../redux/actions/alertDialogActions';
import {
  deleteInovice,
  sendInvoiceMail,
  updatePaymentStatus
} from '../../redux/actions/invoiceActions';
import { getFirebase } from 'react-redux-firebase';
export default function InvoiceDetails(props) {
  const auth = useSelector((state) => state.firebase.auth.uid);
  const { id } = useParams();
  const [pdfUrl, setPdfUrl] = useState();
  const [invoice , setInvoice] = useState()
  const firestore = getFirebase().firestore();
  const dispatch = useDispatch();
  useEffect(async () => {
   let inv = firestore.collection('users').doc(auth).collection("invoices").get().then(snapshot => {
    let values = snapshot.docs.map(doc => {
      if(doc.id == id){
        setInvoice(doc.data())
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

  const handleEmailInvoice = () => {
    dispatch(confirmEmailReminder(sendInvoiceMail(id)));
  };

  const handlePaymentStatus = () => {
    console.log(!invoice.paidStatus)
    dispatch(
      updatePaymentStatus(id, !invoice.paidStatus)
    );

   
  };
  return (
    <div className="invoice-details">
      <Header title={"Invoice Details"} />
<InvoiceData invo = {invoice} id={id} ></InvoiceData>
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

        <button className="primary" 
          onClick={handleEmailInvoice}
         
        >
          <SendIcon></SendIcon>  <span>Send Email</span>
        </button>

        <button className="secondary"  >
          <PDFDownloadLink document={<InvoicePDF invoice={invoice} />} fileName={invoice.invoiceNumber}>
      {({ blob, url, loading, error }) => (<>  {!loading && setPdfUrl(url)} <GetAppIcon /> {' '} {loading ? 'Loading document...' : 'Download now!'}</>)}
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
