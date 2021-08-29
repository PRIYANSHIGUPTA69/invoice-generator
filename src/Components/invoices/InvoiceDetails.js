import React , {useState , useEffect} from "react";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import GetAppIcon from "@material-ui/icons/GetApp";
import PrintIcon from "@material-ui/icons/Print";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import Header from "../header/Header";
import "./invoiceDetails.css"
import InvoiceData from "./InvoiceData";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import {
  deleteInovice,
  updatePaymentStatus
} from '../../redux/actions/invoiceActions';
import { getFirebase } from 'react-redux-firebase';
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';
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
 const downloadInvoice=()=> {
  const input = document.getElementById('billDocuments');
  console.log(document)
  html2canvas(input)
         .then((canvas) => {
           const imgData = canvas.toDataURL('image/png');
           const pdf = new jsPDF("p", "mm", "a4");
           const width = pdf.internal.pageSize.getWidth();
           const height = pdf.internal.pageSize.getHeight();
           pdf.addImage(imgData, 'JPEG', 0, 0,width,height);
           pdf.save("invoice.pdf");
         }).catch(function(error){
           console.log(error)
         })
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
      <InvoiceData invo = {invoice} id={id} paidStatus={paidStatus} ></InvoiceData>
    

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

        <button className="primary"  onClick={downloadInvoice}><GetAppIcon></GetAppIcon> Download  </button>

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
